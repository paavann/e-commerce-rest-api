import swaggerJSDoc from "swagger-jsdoc"
import dotenv from "dotenv"
import path from "path"

dotenv.config()


const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.4",
        info: {
            title: "E-Commerce Platform REST API",
            description: "API Documentation for E-Commerce PLatform",
            version: "1.0.0",
        },
        tags: [
            {
                name: "User Authentication",
                description: "Authentication Endpoints"
            },
        ],
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: "Development Server",
            },
        ],
        components: {
            securitySchemes: {
                Bearer: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "JWT authorization for API",
                },
                ApiKeyAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                    description: "API Key authorization for API",
                },
            },
        },
    },
    apis: [path.resolve(__dirname, "../routes/*.ts")]
}

export const swaggerSpec = swaggerJSDoc(options)