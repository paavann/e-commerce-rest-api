import { body } from "express-validator"


export const createProductValidator = [
    body("name").notEmpty().withMessage("name is required."),
    body("price").isFloat({ gt: 0 }).withMessage("price must be a positive number."),
    body("stock").isInt({ min: 0 }).withMessage("stock must be a non-negative number."),
    body("categoryId").isInt({ gt: 0 }).withMessage("valid categoryId is required."),
    body("description").optional().isString(),
]