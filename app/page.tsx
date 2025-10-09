import AuthTabs from "@/components/auth/auth-tabs";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if(session){
    redirect('/dashboard')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Finance Tracker</h1>
          <p className="mt-2 text-muted-foreground">Tracke your income and expanse</p>
        </div>
        {/* Auth Tabs */}
        <AuthTabs></AuthTabs>
      </div>
    </div>
  );
}
