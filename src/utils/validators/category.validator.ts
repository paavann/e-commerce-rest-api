import { body } from "express-validator"


export const createCategoryValidator = [
    body("name").notEmpty().withMessage("name is required."),
    body("description").optional().isString(),
]