import { body } from "express-validator"


export const createCategoryValidator = [
    body("name")
        .notEmpty().withMessage("name is required."),

    body("description")
        .optional().isString(),
]

export const updateCategoryValidator = [
    body("name")
        .optional().isString().notEmpty().withMessage("name cannot be empty."),
        
    body("description")
        .optional().isString(),
]