import express from "express"
import { createCategoryValidator } from "../../utils/validators/category.validator"
import { validateRequest } from "../../middleware/validateRequests"
import { createCategory } from "../../controllers/category.controller"

const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCategory:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: "Fashion"
 *         description:
 *           type: string
 *           example: "Browse our diverse selection of apparel, footwear, and accessories for men, women, and kids to elevate your personal style"
*/


/**
 * @swagger
 * /api/admin/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid Input
 *       403:
 *         description: Access denied (admin only)
*/
router.post("/", createCategoryValidator, validateRequest, createCategory)

export default router