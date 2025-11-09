import { Category } from "../model"


export const createCategory = async (name: string, description: string) => {
    const category = await Category.create({
        name,
        description,
    })
    return category
}