import type { Request, Response } from "express"
import * as productService from "../services/product.service"



export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock, categoryId } = req.body
        const imageUrl = req.file ? (req.file as any).path : null
        const product = await productService.createProduct(
            name, description, parseFloat(price), parseInt(stock), parseInt(categoryId), imageUrl
        )
        return res.status(201).json({
            success: true,
            message: "product created successfully.",
            data: product,
        })
    } catch(err: any) {
        return res.status(400).json({
            success: false,
            message: err.message || "failed to create product.",
        })
    }
}