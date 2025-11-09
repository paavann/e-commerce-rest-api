import { User } from "./user.model"
import Category from "./category.model"
import Product from "./product.model"


Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
})

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
})

export { User, Category, Product }