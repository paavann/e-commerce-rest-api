import express from "express"
import { createCategoryValidator, updateCategoryValidator } from "../../utils/validators/category.validator"
import { validateRequest } from "../../middleware/validateRequests"
import * as categoryController from "../../controllers/category.controller"

const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     
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
 *     UpdateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Electronics"
 *         description:
 *           type: string
 *           example: "All kinds of electronic gadgets and devices."
*/


/**
 * @swagger
 * /api/admin/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category Management]
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
 *       500:
 *         description: Server error
 */
router.get("/", categoryController.getAllCategories)


/**
 * @swagger
 * /api/admin/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category Management]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
router.get("/:id", categoryController.getCategoryById)


/**
 * @swagger
 * /api/admin/categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 *       403:
 *         description: Access denied (admins only)
 */
router.put("/:id", updateCategoryValidator, validateRequest, categoryController.updateCategory)


/**
 * @swagger
 * /api/admin/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       403:
 *         description: Access denied (admins only)
 */
router.delete("/:id", validateRequest, categoryController.deleteCategory)


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
router.post("/", createCategoryValidator, validateRequest, categoryController.createCategory)

export default router