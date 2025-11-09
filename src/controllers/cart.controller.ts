import type { Request, Response } from "express"
import * as cartService from "../services/cart.service"


export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const { productId, quantity } = req.body

    if (!productId || !quantity)
      return res.status(400).json({ success: false, message: "productId and quantity are required." })

    const item = await cartService.addToCart(userId, Number(productId), Number(quantity))
    return res.status(201).json({
      success: true,
      message: "product added to cart successfully.",
      data: item,
    })
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "failed to add product to cart.",
    })
  }
}


export const viewCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const items = await cartService.getCartItems(userId)

    return res.status(200).json({
      success: true,
      message: "cart retrieved successfully.",
      data: items,
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "failed to fetch cart.",
    })
  }
}


export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const itemId = parseInt(req.params.itemId!)

    if (isNaN(itemId))
      return res.status(400).json({ success: false, message: "Invalid cart item ID." })

    await cartService.removeFromCart(userId, itemId)
    return res.status(200).json({
      success: true,
      message: "item removed from cart successfully.",
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || "failed to remove item from cart.",
    })
  }
}


export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const itemId = parseInt(req.params.itemId!)
    const { quantity } = req.body

    if (isNaN(itemId) || !quantity)
      return res.status(400).json({ success: false, message: "invalid item id or quantity." })

    const updatedItem = await cartService.updateCartItem(userId, itemId, Number(quantity))

    return res.status(200).json({
      success: true,
      message: "cart item updated successfully.",
      data: updatedItem,
    })
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "failed to update cart item.",
    })
  }
}
