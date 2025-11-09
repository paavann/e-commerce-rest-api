import { body } from "express-validator"


export const createProductValidator = [
    body("name")
        .notEmpty().withMessage("name is required."),

    body("price")
        .isFloat({ gt: 0 }).withMessage("price must be a positive number."),

    body("stock")
        .isInt({ min: 0 }).withMessage("stock must be a non-negative number."),

    body("categoryId")
        .isInt({ gt: 0 }).withMessage("valid categoryId is required."),

    body("description")
        .optional().isString(),
]

export const updateProductValidator = [
    body("name")
        .optional({ checkFalsy: true }).isString().withMessage("name must be a string"),

    body("description")
        .optional({ checkFalsy: true }).isString().withMessage("description must be a string"),

    body("price")
        .optional({ checkFalsy: true }).isFloat({ gt: 0 }).withMessage("price must be positive"),

    body("stock")
        .optional({ checkFalsy: true }).isInt({ gt: -1 }).withMessage("stock must be non-negative"),

    body("categoryId")
        .optional({ checkFalsy: true }).isInt({ gt: 0 }).withMessage("categoryId must be valid"),
]