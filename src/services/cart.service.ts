import Cart from "../model/cart.model"
import CartItem from "../model/cartItem.model"
import Product from "../model/product.model"



export const getOrCreateCart = async (userId: number) => {
    let cart = await Cart.findOne({ where: { userId } })
    if(!cart) cart = await Cart.create({ userId })
    return cart
}


export const addToCart = async (userId: number, productId: number, quantity: number) => {
    const cart = await getOrCreateCart(userId)

    const product = await Product.findByPk(productId)
    if(!product) throw new Error("product not found.")
    if(product.stock < quantity) throw new Error("not enough stock available.")

    const existingItem = await CartItem.findOne({ where: { cartId: cart.id, productId }, })
    if(existingItem) {
        existingItem.quantity += quantity
        await existingItem.save()
        return existingItem
    }

    const unitPrice = Number(product.price)

    const cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
        unitPrice,
    })
    return cartItem
}


export const getCartItems = async (userId: number) => {
    const cart = await getOrCreateCart(userId)

    const items = await CartItem.findAll({
        where: { cartId: cart.id },
        include: [
            {
                model: Product,
                as: "product",
                attributes: ["id", "name", "price", "imageUrl", "stock"],
            },
        ],
        order: [["createdAt", "DESC"]],
    })
    return items
}


export const removeFromCart = async (userId: number, itemId: number) => {
    const cart = await getOrCreateCart(userId)

    const item = await CartItem.findOne({
        where: { id: itemId, cartId: cart.id },
    })
    if(!item) throw new Error("cart item not found.")

    await item.destroy()
    return true
}


export const updateCartItem = async (userId: number, itemId: number, quantity: number) => {
    if(quantity < 1) throw new Error("quantity must be at least 1.")

    const cart = await getOrCreateCart(userId)

    const item = await CartItem.findOne({
        where: { id: itemId, cartId: cart.id },
    })
    if(!item) throw new Error("cart item not found.")

    const product = await Product.findByPk(item.productId)
    if(!product) throw new Error("product not found.")
    if(product.stock < quantity) throw new Error("not enough stock available.")

    item.quantity = quantity
    await item.save()
    return item
}
