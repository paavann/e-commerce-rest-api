import express from "express"
import { register, login } from "../controllers/auth.controller"
import { loginValidator, registerValidator } from "../utils/validators/auth.validator"
import { validateRequest } from "../middleware/validateRequests"

const router = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: mySecurePass123
 *     LoginUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: mySecurePass123
*/

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
*/
router.post("/register", registerValidator, validateRequest, register)


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get access token
 *     tags: [User Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
*/
router.post("/login", loginValidator, validateRequest, login)


export default router