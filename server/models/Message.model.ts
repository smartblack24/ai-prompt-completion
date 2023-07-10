import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    reply: { type: String, required: true },
    user: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Message = mongoose.model("Message", MessageSchema)
