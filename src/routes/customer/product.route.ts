import express from "express"
import { getFilteredProducts } from "../../controllers/product.controller"

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductPreview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
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
 *           type: integer
 *           example: 10
 *         category:
 *           type: string
 *           example: "Electronics"
 *         imageUrl:
 *           type: string
 *           example: "https://cdn.example.com/images/macbook-air-m3.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-09T14:32:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-11-09T14:45:00Z"
 *
 *     ProductListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Products fetched successfully"
 *         currentPage:
 *           type: integer
 *           example: 1
 *         totalPages:
 *           type: integer
 *           example: 3
 *         totalItems:
 *           type: integer
 *           example: 24
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductPreview'
 */

/**
 * @swagger
 * /api/customers/products/filter:
 *   get:
 *     summary: List and filter products (Customer)
 *     description: >
 *       Retrieve a list of available products for customers with optional filters.  
 *       Filters can be applied for **price range**, **category**, and **search by name**.  
 *       Supports **pagination** to limit the number of products per page.
 *     tags: [Product Listing with Filters]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search products by name or partial keyword.
 *         example: "macbook"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter products by category name.
 *         example: "electronics"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Minimum product price for filter.
 *         example: 50000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Maximum product price for filter.
 *         example: 150000
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of products per page.
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully fetched filtered product list.
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
 *                   example: "Products fetched successfully"
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalItems:
 *                   type: integer
 *                   example: 47
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "MacBook Air M3"
 *                       description:
 *                         type: string
 *                         example: "Lightweight laptop with M3 chip"
 *                       price:
 *                         type: number
 *                         example: 1249.99
 *                       stock:
 *                         type: integer
 *                         example: 10
 *                       category:
 *                         type: string
 *                         example: "Electronics"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/images/macbook-m3.jpg"
 *       400:
 *         description: Invalid filter parameters.
 *       500:
 *         description: Server error while fetching products.
 */
router.get("/filter", getFilteredProducts)

export default router