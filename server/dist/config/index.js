"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
const cors = require("cors");
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";
// Middleware configuration
function configSergver(app) {
    const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rytrai";
    mongoose_1.default
        .connect(MONGO_URI)
        .then((res) => {
        const dbName = res.connections[0].name;
        console.log(`Connected to Mongo! Database name: "${dbName}"`);
    })
        .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });
    // controls a very specific header to pass headers from the frontend
    app.use(cors({
        origin: [FRONTEND_URL],
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
}
exports.default = configSergver;
//# sourceMappingURL=index.js.map