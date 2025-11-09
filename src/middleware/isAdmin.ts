import type { Request, Response, NextFunction } from "express"


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if(!user || user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "access denied. admins only."
            })
        }
        return next()
    } catch(err) {
        console.error("isadmin error: ", err)
        return res.status(500).json({
            success: false,
            message: "authorization error."
        })
    }
}