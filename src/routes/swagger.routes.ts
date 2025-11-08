import express from "express"
import type { Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "../config/swagger"

const router = express.Router()


router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

router.get("/json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.send(swaggerSpec)
})

export default router