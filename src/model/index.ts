import { User } from "./user.model"
import Category from "./category.model"
import Product from "./product.model"
import Cart from "./cart.model"
import CartItem from "./cartItem.model"
import Order from "./order.model"
import OrderItem from "./orderItem.model"


Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

User.hasOne(Cart, { foreignKey: "userId", as: "cart" })
Cart.belongsTo(User, { foreignKey: "userId", as: "user" })

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" })
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" })

Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems" })
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" })

User.hasMany(Order, { foreignKey: "userId", as: "orders" })
Order.belongsTo(User, { foreignKey: "userId", as: "user" })

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" })
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" })

Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" })
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" })

export { User, Category, Product }