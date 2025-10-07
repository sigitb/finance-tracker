"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { RegisterFormSchema, registerSchema } from "@/lib/validation"
import {zodResolver} from "@hookform/resolvers/zod"
import { registerUser } from "@/lib/actions/auth-action"
import { toast } from "sonner"
export function RegisterForm() {
    const [isLoading, setLoading] = useState(false)
    const form = useForm<RegisterFormSchema>({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            name: "",
            email:"",
            confirmPassword:"",
            password:""
        }
    })

    const onRegister = async (values:RegisterFormSchema) => {
        setLoading(true)
        try {
            const result = await registerUser({
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword:values.confirmPassword,
            })
            if(result.success){
                toast.success('Account created successfully')
                form.reset()
            }else{
                toast.error(result.error || "Something went wrong")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally{
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new account</CardTitle>
                <CardDescription>Enter to information to create new account</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onRegister)}>
                    <CardContent className="space-y-4">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="password confirmation"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                        </FormField>
                    </CardContent>
                    <CardFooter className="my-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creatting account..." : "Create Account"}
                            </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}