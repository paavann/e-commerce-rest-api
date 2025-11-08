import { body } from "express-validator"


export const registerValidator = [
    body("email").isEmail().withMessage("valid email required."),
    body("password").isLength({ min: 6 }).withMessage("password should contain minimum 6 characters.")
]

export const loginValidator = [
    body("email").isEmail().withMessage("valid email required."),
    body("password").notEmpty().withMessage("password required.")
]