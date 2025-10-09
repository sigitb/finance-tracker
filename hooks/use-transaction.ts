"use client"

import { getTransaction } from "@/lib/actions/transaction"
import { Transaction } from "@/types"
import { useEffect, useState } from "react"

export function useTransaction(userId: string){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error|null>(null)    

    const fetchTransaction = async () => {
        try {
            setIsLoading(true)
            const data = await getTransaction(userId)
            setTransactions(
                data.map((item) => ({
                    ...item,
                    type: item.type as "income" | "expense"
                }))
            )
            setError(null)
        } catch (error) {
            setError(error instanceof Error ? error : new Error("failed to fetch transaction"))
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(userId){
            fetchTransaction()
        }
    }, [userId])
    return {
        transactions,
        isLoading,
        error,
        refetch: fetchTransaction
    }
}