import express from "express"
import { Application } from "express"
import mongoose from "mongoose"

// Needed to accept requests from 'the outside'. CORS stands for cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
const cors = require("cors")

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000"

// Server configuration
export default function configSergver(app: Application) {
  const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rytrai"

  mongoose
    .connect(MONGO_URI)
    .then((res) => {
      const dbName = res.connections[0].name
      console.log(`Connected to Mongo! Database name: "${dbName}"`)
    })
    .catch((err) => {
      console.error("Error connecting to mongo: ", err)
    })

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: [FRONTEND_URL],
    }),
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
}
