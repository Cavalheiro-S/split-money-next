interface ApiBase<T> {
    data?: T,
    error?: string,
    message?: string,
    statusCode?: number,
}

interface User {
    id: string,
    name?: string,
    email: string,
    password?: string,
    loginMethod: string,
    balance: number,
}

interface Transaction {
    id?: string,
    amount: number,
    category: string,
    date: string,
    description: string,
    type: "income" | "outcome",
    userId?: string
}

interface TransactionWithUserId extends Transaction {
    userId: string,
}