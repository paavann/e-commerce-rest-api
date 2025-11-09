import jwt, { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"

dotenv.config()


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "authorization header missing or invalid."
            })
        }

        const token = authHeader.split(" ")[1]
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "token missing in authorization header."
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload | string
        
        if(typeof decoded !== "object" || !decoded) {
            return res.status(401).json({
                success: false,
                message: "invalid token format."
            })
        }

        req.user = {
            id: decoded.id as number,
            email: decoded.email as string,
            role: decoded.role as "admin" |  "customer",
            iat: decoded.iat,
            exp: decoded.exp,
        }
        return next()
    } catch(err) {
        console.error("verifyToken error: ", err)
        return res.status(401).json({
            success: false,
            message: "invalid or expired token."
        })
    }
}