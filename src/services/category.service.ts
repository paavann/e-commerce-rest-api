import { Category } from "../model"



export const createCategory = async (name: string, description: string) => {
  const category = await Category.create({ name, description, })
  return category
}


export const getAllCategories = async () => {
  const categories = await Category.findAll({ order: [["createdAt", "DESC"]] })
  return categories
}


export const getCategoryById = async (id: number) => {
  const category = await Category.findByPk(id)
  if (!category) throw new Error("category not found.")
  return category
}


export const updateCategory = async (id: number, name?: string, description?: string) => {
  const category = await Category.findByPk(id)
  if (!category) throw new Error("category not found.")

  category.name = name ?? category.name
  category.description = description ?? category.description
  await category.save()

  return category
}


export const deleteCategory = async (id: number) => {
  const category = await Category.findByPk(id)
  if (!category) throw new Error("category not found.")
  await category.destroy()
  return true
}