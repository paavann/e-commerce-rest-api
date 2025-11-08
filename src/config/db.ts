import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!) || 5432,
    dialect: "postgres",
    logging: false,
  }
)

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("database connected successfully.")

    await sequelize.sync({ alter: true })
    console.log("tables synced successfully.")
  } catch(err) {
    console.error("database connection failed: ", err)
  }
}