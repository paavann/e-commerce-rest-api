import express from "express"
import productRoutes from "./product.route"
import cartRoutes from "./cart.routes"
import orderRoutes from "./order.routes"

const router = express.Router()

router.use("/products", productRoutes)
router.use("/cart", cartRoutes)
router.use("/orders", orderRoutes)

export default router