import { Tabs,TabsContent,TabsList, TabsTrigger } from "../ui/tabs";
import { LoginForm } from "./login-from";
import { RegisterForm } from "./register-form";

export default function AuthTabs(){
    return (
        <Tabs className="w-full" defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    )
}