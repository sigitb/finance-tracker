import { SectionCards } from "@/components/section-cards";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetaData(): Promise<Metadata> {
  const data = await auth()
  return {
    title: `${data?.user.name} Dashboard`,
    description: 'Finance Tracker'
  }
}
export default async function Page() {
  const session = await auth()  
  if(!session?.user){
    redirect('/')
  }
  return <SectionCards />
}