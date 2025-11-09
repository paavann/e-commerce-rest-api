import { Product, Category } from "../model"


export const createProduct = async (
    name: string,
    description: string,
    price: number,
    stock: number,
    categoryId: number,
    imageUrl: string
) => {
    const category = await Category.findByPk(categoryId)
    if(!category) throw new Error("category not found.")

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        categoryId,
        imageUrl,
    })
    return product
}