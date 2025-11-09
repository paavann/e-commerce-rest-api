import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../config/db"

interface ProductAttributes {
    id: number
    name: string
    description?: string | null
    price: number
    stock: number
    categoryId: number
    imageUrl?: string | null
    createdAt?: Date
    updatedAt?: Date
}

type ProductCreationAttributes = Optional<ProductAttributes, "id" | "description" | "imageUrl" | "createdAt" | "updatedAt">


export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number
    public name!: string
    public description!: string | null
    public price!: number
    public stock!: number
    public categoryId!: number
    public imageUrl!: string | null

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 200],
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                isInt: true,
            },
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: "categories",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true,
            },
        },
    },
    {
        sequelize,
        tableName: "products",
        timestamps: true,
    }
)

export default Product