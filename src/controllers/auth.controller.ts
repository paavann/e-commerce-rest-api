import type { Request, Response } from "express"
import * as authService from "../services/auth.service"



export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if(!email || !password) return res.status(400).json({ message: "both email and password are required to resgiter." })
        
        const data = await authService.registerUser(email, password)
        return res.status(201).json(data)
    } catch(err:any) {
        return res.status(400).json({ message: err.message })
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if(!email || !password) return res.status(400).json({ message: "both email and password are required." })
        
        const data = await authService.loginUser(email, password)
        return res.status(200).json(data)
    } catch(err: any) {
        return res.status(401).json({ message: err.message })
    }
}