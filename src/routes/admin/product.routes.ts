import express from "express"
import { createProductValidator, updateProductValidator } from "../../utils/validators/product.validator"
import { validateRequest } from "../../middleware/validateRequests"
import * as productController from "../../controllers/product.controller"
import { upload } from "../../middleware/upload"

const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateAndUpdateProduct:
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
 *   get:
 *     summary: List all products
 *     tags: [Product Management]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", productController.getAllProducts)


/**
 * @swagger
 * /api/admin/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById)


/**
 * @swagger
 * /api/admin/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Product Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "MacBook Air M3"
 *               description:
 *                 type: string
 *                 example: "Lightweight laptop with M3 chip"
 *               price:
 *                 type: number
 *                 example: 1249.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", upload.single("image"), updateProductValidator, validateRequest, productController.updateProduct)


/**
 * @swagger
 * /api/admin/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", productController.deleteProduct)


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
 *             $ref: '#/components/schemas/CreateAndUpdateProduct'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Invalid Input
 *       403:
 *         description: Access denied (admin only)
*/
router.post("/", upload.single("image"), createProductValidator, validateRequest, productController.createProduct)

export default router