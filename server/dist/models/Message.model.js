"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    reply: { type: String, required: true },
    user: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.Message = mongoose_1.default.model("Message", MessageSchema);
//# sourceMappingURL=Message.model.js.map