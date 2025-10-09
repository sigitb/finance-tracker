export type Transaction = {
    id: string
    amount: number
    description: string
    date: Date
    type: "income" | "expense"
    category: string
}