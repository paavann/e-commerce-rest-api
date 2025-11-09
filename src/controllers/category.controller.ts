import type { Request, Response } from "express"
import * as categoryService from "../services/category.service"



export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body
        const category = await categoryService.createCategory(name, description)
        return res.status(201).json({
            success: true,
            message: "category created successfully.",
            data: category,
        })
    } catch(err: any) {
        return res.status(400).json({
            success: false,
            message: err.message || "failed to create category."
        })
    }
}