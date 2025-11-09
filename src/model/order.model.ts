import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../config/db"

interface OrderAttributes {
  id: number
  userId: string // UUID
  totalAmount: number
  status: string
  createdAt?: Date
  updatedAt?: Date
}

type OrderCreationAttributes = Optional<OrderAttributes, "id" | "status" | "createdAt" | "updatedAt">

export class Order extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes {
  public id!: number
  public userId!: string
  public totalAmount!: number
  public status!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Order.init(
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
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
    timestamps: true,
  }
)


export default Order
