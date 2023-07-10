"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const config_1 = __importDefault(require("./config"));
const error_handling_1 = __importDefault(require("./error-handling"));
const app = (0, express_1.default)();
(0, config_1.default)(app);
// Handling routes here
app.use("/chat", chat_routes_1.default);
// To handle errors. Routes that don't exist or errors that you handle in specific routes
(0, error_handling_1.default)(app);
exports.default = app;
//# sourceMappingURL=app.js.map