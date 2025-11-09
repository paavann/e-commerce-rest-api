import express from "express"
import { verifyToken } from "../../middleware/verifyToken"
import * as cartController from "../../controllers/cart.controller"

const router = express.Router()

router.use(verifyToken)

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         productId:
 *           type: integer
 *           example: 2
 *         quantity:
 *           type: integer
 *           example: 3
 *         unitPrice:
 *           type: number
 *           example: 599.99
 *         product:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Wireless Mouse"
 *             imageUrl:
 *               type: string
 *               example: "https://cdn.example.com/mouse.jpg"
 *
 *     CartResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Cart retrieved successfully"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 */


/**
 * @swagger
 * /api/customers/cart/add:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Invalid product or quantity
 *       404:
 *         description: Product not found
 */
router.post("/add", cartController.addToCart)


/**
 * @swagger
 * /api/customers/cart:
 *   get:
 *     summary: View current user's cart
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all items in user's cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 */
router.get("/", cartController.viewCart)


/**
 * @swagger
 * /api/customers/cart/{itemId}:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cart item ID to remove
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Cart item not found
 */
router.delete("/:itemId", cartController.removeFromCart)


/**
 * @swagger
 * /api/customers/cart/{itemId}:
 *   put:
 *     summary: Update quantity of a cart item
 *     tags: [Shopping Cart & Order Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cart item ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       400:
 *         description: Invalid quantity
 *       404:
 *         description: Cart item not found
 */
router.put("/:itemId", cartController.updateCartItem)

export default router