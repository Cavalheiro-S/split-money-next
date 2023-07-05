export interface TransactionDTO {
    id?: number,
    amount: number,
    category: string,
    date: string,
    description: string,
    type: "income" | "outcome",
}