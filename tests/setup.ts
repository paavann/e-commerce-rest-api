import dotenv from "dotenv"
dotenv.config({ path: ".env.test" })

import { sequelize } from "../src/config/db"
import request from "supertest"
import app from "../src/app"

export let adminToken: string
export let customerToken: string


beforeAll(async () => {
    await sequelize.sync({ force: true })
    const admin = { email: "admin@example.com", password: "admin123" }

    await request(app).post("/api/auth/register").send(admin)
    const adminLogin = await request(app).post("/api/auth/login").send(admin)

    adminToken = adminLogin.body.data?.accessToken
    if (!adminToken) {
        console.error("admin login response:", adminLogin.body)
        throw new Error("admin token not generated — check JWT_SECRET or auth routes.")
    }

    const customer = { email: "customer@example.com", password: "password123" }

    await request(app).post("/api/auth/register").send(customer)
    const customerLogin = await request(app).post("/api/auth/login").send(customer)

    customerToken = customerLogin.body.data?.accessToken

    if (!customerToken) {
        console.error("customer login response:", customerLogin.body)
        throw new Error("customer token not generated — check JWT_SECRET or auth routes.")
    }
})

afterAll(async () => {
    await sequelize.close()
    console.log("database connection closed after tests.")
})
