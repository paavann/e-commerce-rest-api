import { Model, DataTypes, Optional } from "sequelize"
import { sequelize } from "../config/db"

interface CategoryAttributes {
    id: number
    name: string
    description?: string | null
    createdAt?: Date
    updatedAt?: Date
}

type CategoryCreationAttributes = Optional<CategoryAttributes, "id" | "description" | "createdAt" | "updatedAt">


export class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes {
        public id!: number
        public name!: string
        public description!: string | null
        public readonly createdAt!: Date
        public readonly updatedAt!: Date
    }

Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                len: [1, 120],
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "categories",
        timestamps: true,
    }
)

export default Category