import express from "express"
import chatRoutes from "./routes/chat.routes"
import config from "./config"
import errorHandling from "./error-handling"

const app = express()
config(app)

// Handling routes
app.use("/chat", chatRoutes)

errorHandling(app)

export default app
