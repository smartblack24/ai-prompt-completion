"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChat = void 0;
const openai_1 = require("openai");
const express_1 = __importDefault(require("express"));
const Message_model_1 = require("../models/Message.model");
const router = express_1.default.Router();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const createChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, user } = req.body;
    try {
        let history = "";
        const userMessages = yield Message_model_1.Message.find({ user });
        if (userMessages !== undefined) {
            history = userMessages.reverse().slice(0, 10).reduce((acc, message) => {
                return acc + `Reply for ${message.text} is ${message.reply}` + "\n";
            }, "");
        }
        else {
            console.log("History empty");
        }
        try {
            const response = yield openai.createCompletion({
                model: "text-davinci-003",
                prompt: history + text + '" \n\n',
                max_tokens: 100,
                temperature: 0.5,
                top_p: 1,
                stop: ["\n"],
            });
            const reply = response.data.choices[0].text;
            console.log("Reply from OpenAI API:", reply);
            if (!reply) {
                console.warn("Empty reply from OpenAI API");
                return res.status(201).send("");
            }
            // const newMessage = await Message.create({ text: "Patient: " + text, user: userId });
            yield Message_model_1.Message.create({ text, user, reply });
            // Return both the newMessage and savedMessage in the response
            res.status(201).json(reply);
        }
        catch (error) {
            console.error("An error occurred", error);
            res.status(500).send("An error occurred");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createChat = createChat;
router.post("/", exports.createChat);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map