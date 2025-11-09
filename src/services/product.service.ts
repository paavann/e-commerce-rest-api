import { Product, Category } from "../model"
import { Op } from "sequelize"

interface ProductUpdateInput {
  name?: string | undefined
  description?: string | undefined
  price?: number | undefined
  stock?: number | undefined
  categoryId?: number | undefined
  imageUrl?: string | undefined
}

interface ProductFilterOptions {
  search?: string | undefined
  category?: string | undefined
  minPrice?: number | undefined
  maxPrice?: number | undefined
  page?: number | undefined
  limit?: number | undefined
}



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


export const getProductById = async (id: number) => {
  const product = await Product.findByPk(id, {
    include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
  })
  if (!product) throw new Error("product not found.")
  return product
}


export const getAllProducts = async () => {
  const products = await Product.findAll({
    include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
  })
  return products
}


export const updateProduct = async (id: number, updates: ProductUpdateInput) => {
  if(isNaN(id)) throw new Error("invalid product id.")

  const product = await Product.findByPk(id)
  if(!product) throw new Error("product not found.")

  if (updates.categoryId) {
    const category = await Category.findByPk(updates.categoryId)
    if(!category) throw new Error("invalid category id.")
  }

  const cleanedUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined)
  )

  if (Object.keys(cleanedUpdates).length === 0)
    throw new Error("no valid fields provided for update.")

  await Product.update(cleanedUpdates, { where: { id } })

  const updatedProduct = await Product.findByPk(id)
  return updatedProduct
}


export const deleteProduct = async (id: number) => {
  const product = await Product.findByPk(id)
  if(!product) throw new Error("product not found.")
  await product.destroy()
  return true
}


export const getFilteredProducts = async (filters: ProductFilterOptions) => {
  const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = filters

  const whereClause: any = {}

  if(search) {
    whereClause[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ]
  }

  if(minPrice || maxPrice) {
    whereClause.price = {}
    if (minPrice) whereClause.price[Op.gte] = minPrice
    if (maxPrice) whereClause.price[Op.lte] = maxPrice
  }

  const offset = (page - 1) * limit

  const { count, rows } = await Product.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
        ...(category && { where: { name: { [Op.iLike]: category } } }),
      },
    ],
    attributes: ["id", "name", "description", "price", "stock", "imageUrl", "createdAt", "updatedAt"],
    offset,
    limit,
    order: [["createdAt", "DESC"]],
  })

  const totalPages = Math.ceil(count / limit)

  return { currentPage: page, totalPages, totalItems: count, data: rows, }
}