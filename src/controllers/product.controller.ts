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


export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts()
    return res.status(200).json({ success: true, data: products })
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message })
  }
}


export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id!
    const product = await productService.getProductById(parseInt(id))

    return res.status(200).json({ success: true, data: product })
  } catch (err: any) {
    return res.status(404).json({ success: false, message: err.message })
  }
}


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!)
    if (isNaN(id))
      return res.status(400).json({ success: false, message: "invalid product id." })

    const { name, description, price, stock, categoryId } = req.body
    const imageUrl = req.file ? (req.file as any).path : undefined

    const parsedPrice = price && !isNaN(Number(price)) ? parseFloat(price) : undefined
    const parsedStock = stock && !isNaN(Number(stock)) ? parseInt(stock) : undefined
    const parsedCategoryId =
      categoryId && !isNaN(Number(categoryId)) ? parseInt(categoryId) : undefined

    const updated = await productService.updateProduct(id, {
      name,
      description,
      price: parsedPrice,
      stock: parsedStock,
      categoryId: parsedCategoryId,
      imageUrl,
    })

    return res.status(200).json({
      success: true,
      message: "product updated successfully.",
      data: updated,
    })
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message })
  }
}


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id!
    await productService.deleteProduct(parseInt(id))

    return res.status(200).json({
      success: true,
      message: "product deleted successfully.",
    })
  } catch (err: any) {
    return res.status(404).json({ success: false, message: err.message })
  }
}


export const getFilteredProducts = async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = "1",
      limit = "10",
    } = req.query

    const filters = {
      search: search ? String(search) : undefined,
      category: category ? String(category) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      page: Number(page),
      limit: Number(limit),
    }

    const data = await productService.getFilteredProducts(filters)

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      ...data,
    })
  } catch (err: any) {
    console.error("Error fetching filtered products:", err)
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch products.",
    })
  }
}
