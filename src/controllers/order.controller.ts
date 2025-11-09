import type { Request, Response } from "express"
import * as orderService from "../services/order.service"


export const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const order = await orderService.placeOrder(userId)

    return res.status(201).json({
      success: true,
      message: "order placed successfully.",
      data: order,
    })
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message || "failed to place order.",
    })
  }
}


export const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const orders = await orderService.getOrderHistory(userId)

    return res.status(200).json({
      success: true,
      message: "order history fetched successfully.",
      data: orders,
    })
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "failed to fetch order history.",
    })
  }
}


export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id
    const orderId = parseInt(req.params.orderId!)

    if (isNaN(orderId))
      return res.status(400).json({ success: false, message: "Invalid order ID." })
    const order = await orderService.getOrderById(userId, orderId)

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully.",
      data: order,
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: err.message || "Order not found.",
    })
  }
}
