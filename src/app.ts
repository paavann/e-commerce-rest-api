import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import swaggerRoutes from "./routes/swagger.routes"
import helmet from "helmet"

dotenv.config()

const app = express()

//middleware.
app.use(helmet())
app.use(express.json())
app.use(cors({ origin: "*", methods: ['GET', 'POST', 'PUT', 'DELETE'] }))
app.use(express.urlencoded({ extended: true }))

//routes.
app.use("/api/auth", authRoutes)

//api docs.
app.use("/api-docs", swaggerRoutes)

export default app