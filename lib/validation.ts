import {email, z} from "zod"

export const registerSchema = z.object({
    name: z.string().min(4,"Name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path:["confirmPassword"]
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email Required"),
    password: z.string().nonempty("Password Required").min(6, "Password must be at least 6 characters"),
})

export type LoginFormSchema =  z.infer<typeof loginSchema>
export type RegisterFormSchema = z.infer<typeof registerSchema>