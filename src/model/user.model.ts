import { DataTypes, Model } from "sequelize"
import { sequelize } from "../config/db"


export class User extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password_hash!: string;
    public role!: 'admin' | 'customer';
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'customer'),
            defaultValue: 'customer',
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
    }
)