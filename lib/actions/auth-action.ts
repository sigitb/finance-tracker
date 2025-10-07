"use server"
import { z } from "zod"
import { loginSchema, registerSchema } from "../validation";
import { prisma } from "../prisma";
import { hash } from "bcryptjs";
import { signIn } from "../auth";

export async function registerUser(data: z.infer<typeof registerSchema>) {
    try {
        const validationData = registerSchema.parse(data)
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validationData.email,
            }
        })
        if (existingUser) {
            return {
                success: false,
                error: "user with this email already exists"
            }
        }
        const hashedPassword = await hash(validationData.password, 10)
        const user = await prisma.user.create({
            data: {
                name: validationData.name,
                email: validationData.email,
                password: hashedPassword
            }
        })
        return {
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    } catch (error) {
        console.error("registration error: ", error)
        return {
            success: false,
            error: "something went wrong during registration"
        }
    }
}

export async function loginUser(data: z.infer<typeof loginSchema>) {
    try {
        const validationData = loginSchema.parse(data)
        await signIn("credentials", {
            email: validationData.email,
            password: validationData.password,
            redirect: false
        })
        return { success: true }
    } catch (error) {
        console.error("login error: ", error);

        return {
            success: false,
            error: "something went wrong during login"
        }
    }
}