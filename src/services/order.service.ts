import Cart from "../model/cart.model"
import CartItem from "../model/cartItem.model"
import Order from "../model/order.model"
import OrderItem from "../model/orderItem.model"
import Product from "../model/product.model"
import { sequelize } from "../config/db"



export const placeOrder = async (userId: string) => {
    const transaction = await sequelize.transaction()

    try {
        const cart = await Cart.findOne({ where: { userId }, transaction })
        if(!cart) throw new Error("cart not found.")

        const cartItems = await CartItem.findAll({
            where: { cartId: cart.id },
            include: [{ model: Product, as: "product" }],
            transaction,
        })

        if(cartItems.length === 0) throw new Error("cart is empty.")

        const totalAmount = cartItems.reduce(
            (sum, item) => sum + Number(item.unitPrice) * item.quantity, 0
        )

        const order = await Order.create(
            { userId, totalAmount, status: "placed", },
            { transaction }
        )

        for (const item of cartItems) {
            await OrderItem.create(
                {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                },
                { transaction }
            )

            if (item.product) {
                item.product.stock -= item.quantity
                await item.product.save({ transaction })
            }
        }

        await CartItem.destroy({ where: { cartId: cart.id }, transaction })
        await transaction.commit()
        return order
    } catch (err) {
        await transaction.rollback()
        throw err
    }
}


export const getOrderHistory = async (userId: string) => {
    const orders = await Order.findAll({
        where: { userId },
        include: [
            {
                model: OrderItem,
                as: "items",
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "imageUrl"],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    })

    return orders
}


export const getOrderById = async (userId: string, orderId: number) => {
    const order = await Order.findOne({
        where: { id: orderId, userId },
        include: [
            {
                model: OrderItem,
                as: "items",
                include: [
                    {
                        model: Product,
                        as: "product",
                        attributes: ["id", "name", "imageUrl", "price"],
                    },
                ],
            },
        ],
    })

    if (!order) throw new Error("order not found.")
    return order
}