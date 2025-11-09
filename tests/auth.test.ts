import request from "supertest"
import app from "../src/app"
import { sequelize } from "../src/config/db"

describe("Auth Endpoints", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true })
    })

    it("should register a new user", async () => {
        const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@example.com", password: "123456" })

        expect(res.statusCode).toBe(201)
        expect(res.body.success).toBe(true)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveProperty("user")
        expect(res.body.data.user.email).toBe("test@example.com")

        expect(res.body.data).toHaveProperty("accessToken")
        expect(res.body.data).toHaveProperty("refreshToken")
    })

    it("should login successfully", async () => {
        const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@example.com", password: "123456" })

        expect([200, 201]).toContain(res.statusCode)

        expect(res.body.success).toBe(true)
        expect(res.body).toHaveProperty("data")
        expect(res.body.data).toHaveProperty("user")
        expect(res.body.data).toHaveProperty("accessToken")
        expect(res.body.data).toHaveProperty("refreshToken")

        expect(typeof res.body.data.accessToken).toBe("string")
        expect(res.body.data.accessToken.split(".")).toHaveLength(3)
    })
})
