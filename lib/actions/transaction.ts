"use server"

import { prisma } from "../prisma"

export async function getTransaction(userId:string) {
    try {
        const transaction =  await prisma.transaction.findMany({
            where:{userId},
            orderBy: {date: "desc"}
        })
        return transaction
    } catch (error) {
        console.error("Error featching transactions", error)
        return []        
    }
}