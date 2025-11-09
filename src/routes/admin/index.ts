import express from "express"
import { isAdmin } from "../../middleware/isAdmin"
import productRoutes from "./product.routes"
import categoryRoutes from "./category.routes"
import { verifyToken } from "../../middleware/verifyToken"

const router = express.Router()

router.use(verifyToken)
router.use(isAdmin)

router.use("/products", productRoutes)
router.use("/categories", categoryRoutes)

export default router