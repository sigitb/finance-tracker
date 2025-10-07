"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function RegisterForm() {
    const [isLoading, setLoading] = useState(false)
    const form = useForm({})

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create new account</CardTitle>
                <CardDescription>Enter to information to create new account</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form>
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
                            name="password_confirmation"
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