import express from "express"
import * as orderController from "../../controllers/order.controller"
import { verifyToken } from "../../middleware/verifyToken"

const router = express.Router()

router.use(verifyToken)


/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItemShort:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 42
 *         quantity:
 *           type: integer
 *           example: 2
 *         unitPrice:
 *           type: number
 *           example: 599.99
 *         product:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 42
 *             name:
 *               type: string
 *               example: "Wireless Mouse"
 *             imageUrl:
 *               type: string
 *               example: "https://cdn.example.com/mouse.jpg"
 *     OrderShort:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 100
 *         totalAmount:
 *           type: number
 *           example: 1199.98
 *         status:
 *           type: string
 *           example: "placed"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-09T15:00:00Z"
 *     OrderDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 100
 *         userId:
 *           type: string
 *           example: "a3f4...-uuid"
 *         totalAmount:
 *           type: number
 *           example: 1199.98
 *         status:
 *           type: string
 *           example: "placed"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItemShort'
 */


/**
 * @swagger
 * /api/customers/orders/place:
 *   post:
 *     summary: Place an order from the current user's cart
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully."
 *                 data:
 *                   $ref: '#/components/schemas/OrderShort'
 *       400:
 *         description: Bad request (empty cart, validation error)
 *       500:
 *         description: Server error
 */
router.post("/place", orderController.placeOrder)


/**
 * @swagger
 * /api/customers/orders/history:
 *   get:
 *     summary: Get order history for current user
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order history fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderShort'
 *       500:
 *         description: Server error
 */
router.get("/history", orderController.getOrderHistory)


/**
 * @swagger
 * /api/customers/orders/{orderId}:
 *   get:
 *     summary: Get a single order's details
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order to fetch
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Order fetched successfully."
 *                 data:
 *                   $ref: '#/components/schemas/OrderDetail'
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 */
router.get("/:orderId", orderController.getOrderById)

export default router