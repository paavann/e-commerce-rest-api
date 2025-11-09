import type { Request, Response } from "express"
import * as authService from "../services/auth.service"



export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await authService.registerUser(email, password)
        return res.status(201).json({
            success: true,
            message: "user created successfully.",
            data: user,
        })
    } catch(err:any) {
        console.log("register user error: ", err)
        return res.status(400).json({
            success: false,
            message: "failed to register user.",
        })
    }
}


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await authService.loginUser(email, password)
        return res.status(201).json({
            success: true,
            message: "user loggedin successfully.",
            data: user,
        })
    } catch(err: any) {
        console.log("login user error: ", err)
        return res.status(400).json({
            success: false,
            message: "failed to log user in.",
        })
    }
}