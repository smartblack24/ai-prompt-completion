import { Request, Response, Application } from "express"

export default function ErrorHandling(app: Application) {
  app.use((req: Request, res: Response) => {
    // This middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" })
  })

  app.use((req: Request, res: Response) => {
    // Only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      })
    }
  })
}
