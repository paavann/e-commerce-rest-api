import express from "express"
import { createProductValidator } from "../../utils/validators/product.validator"
import { validateRequest } from "../../middleware/validateRequests"
import { createProduct } from "../../controllers/product.controller"
import { upload } from "../../middleware/upload"

const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateProduct:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - stock
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           example: "MacBook Air M3"
 *         description:
 *           type: string
 *           example: "Lightweight laptop with M3 chip"
 *         price:
 *           type: number
 *           example: 1249.99
 *         stock:
 *           type: number
 *           example: 10
 *         categoryId:
 *           type: integer
 *           example: 1
 *         image:
 *           type: string
 *           format: binary
*/


/**
 * @swagger
 * /api/admin/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid Input
 *       403:
 *         description: Access denied (admin only)
*/
router.post("/", upload.single("image"), createProductValidator, validateRequest, createProduct)

export default router