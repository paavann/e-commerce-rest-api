import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../config/db"

interface CartAttributes {
  id: number
  userId: number
  createdAt?: Date
  updatedAt?: Date
}

type CartCreationAttributes = Optional<CartAttributes, "id" | "createdAt" | "updatedAt">

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number
  public userId!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "carts",
    timestamps: true,
  }
)

export default Cart