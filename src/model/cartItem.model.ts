import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../config/db"
import Product from "./product.model"

interface CartItemAttributes {
  id: number
  cartId: number
  productId: number
  quantity: number
  unitPrice: number
  createdAt?: Date
  updatedAt?: Date
}

type CartItemCreationAttributes = Optional<CartItemAttributes, "id" | "createdAt" | "updatedAt">

export class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes {
  public id!: number
  public cartId!: number
  public productId!: number
  public quantity!: number
  public unitPrice!: number
  public product?: Product
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "carts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
  },
  {
    sequelize,
    tableName: "cart_items",
    timestamps: true,
  }
)

export default CartItem