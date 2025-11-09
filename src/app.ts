import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import swaggerRoutes from "./routes/swagger.routes"
import authRoutes from "./routes/auth.routes"
import adminRoutes from "./routes/admin/admin.routes"
import customerRoutes from "./routes/customer/customer.routes"

dotenv.config()

const app = express()

//middleware.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: "cross-origin" } }))
app.use(cors({ origin: "*", methods: ['GET', 'POST', 'PUT', 'DELETE'] }))

//routes.
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/customers", customerRoutes)

//api docs.
app.use("/api-docs", swaggerRoutes)

export default app