import { Configuration, OpenAIApi } from "openai"
import express, { Request, Response, NextFunction } from "express"
import { Message } from "../models/Message.model"

const router = express.Router()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const createChatController = async (req: Request, res: Response, next: NextFunction) => {
  const { text, user } = req.body

  try {
    let history = ""
    const userMessages = await Message.find({ user })
    if (userMessages !== undefined) {
      history = userMessages
        .reverse()
        .slice(0, 10)
        .reduce((acc, message) => {
          return acc + `Reply for ${message.text} is ${message.reply}` + "\n"
        }, "")
    } else {
      console.log("History empty")
    }

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: history + text + '" \n\n',
        max_tokens: 100, // 4 characters by token, 0.75 words per token
        temperature: 0.5,
        top_p: 1,
        stop: ["\n"],
      })

      const reply = response.data.choices[0].text
      console.log("Reply from OpenAI API:", reply)

      if (!reply) {
        console.warn("Empty reply from OpenAI API")
        return res.status(201).send("")
      }

      // const newMessage = await Message.create({ text: "Patient: " + text, user: userId });
      await Message.create({ text, user, reply })

      // Return both the newMessage and savedMessage in the response
      res.status(201).json(reply)
    } catch (error) {
      console.error("An error occurred", error)
      res.status(500).send("An error occurred")
    }
  } catch (error) {
    next(error)
  }
}

router.post("/", createChatController)

export default router
