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


export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories()

    return res.status(200).json({
      success: true,
      message: "categories fetched successfully.",
      data: categories,
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "failed to fetch categories.",
    })
  }
}


export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!)
    const category = await categoryService.getCategoryById(id)

    return res.status(200).json({
      success: true,
      message: "category fetched successfully.",
      data: category,
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || "category not found.",
    })
  }
}


export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!)
    const { name, description } = req.body
    const updated = await categoryService.updateCategory(id, name, description)

    return res.status(200).json({
      success: true,
      message: "category updated successfully.",
      data: updated,
    })
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "failed to update category.",
    })
  }
}


export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id!)
    await categoryService.deleteCategory(id)

    return res.status(200).json({
      success: true,
      message: "category deleted successfully.",
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || "failed to delete category.",
    })
  }
}