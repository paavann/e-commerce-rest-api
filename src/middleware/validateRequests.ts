import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req)
    if(!result.isEmpty()) {
        const errors = result.mapped()
        const keys = Object.keys(errors)

        if(keys.length>0) {
            const firstKey = keys[0] as keyof typeof errors
            const firstError = errors[firstKey]
            if(firstError && "param" in firstError) {
                return res.status(400).json({
                    message: firstError?.msg,
                    field: firstError?.param,
                    errors,
                })
            }
        }

        return res.status(400).json({ message: "Invalid request", errors })
    }
    return next()
}