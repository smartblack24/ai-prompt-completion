/**
 * We are not using this Middleware for this application.
 * But I will add it for future Security and Authentication
 */
import { Request } from "express"
import { expressjwt } from "express-jwt"

// Instantiate the JWT token validation middleware
const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
})

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req: Request) {
  // Check if the token is available on the request Headers
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1]
    return token
  }

  return null
}

export default isAuthenticated
