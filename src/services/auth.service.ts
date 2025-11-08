import { User } from "../model/user.model"
import { hashPassword, comparePassword } from "../utils/hash"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt"



export const registerUser = async (email: string, password: string) => {
    const existing = await User.findOne({ where: { email } })
    if(existing) throw new Error("user already exists.")

    const password_hash = await hashPassword(password)
    const user = await User.create({ email, password_hash })

    const payload = { id: user.id, email: user.email, role: user.role }
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    return { user, accessToken, refreshToken }
}


export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } })
    if(!user) throw new Error("invalid email. please enter a valid email.")

    const isMatch = await comparePassword(password, user.password_hash)
    if(!isMatch) throw new Error("incorrect password. please check your password and try again.")

    const payload = { id: user.id, email: user.email, role: user.role }
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    return { user, accessToken, refreshToken }
}