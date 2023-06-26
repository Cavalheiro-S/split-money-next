import { createContext, useState } from "react";

export interface ErrorData {
    error: string[],
    setError: React.Dispatch<React.SetStateAction<string[]>>
}

interface ErrorDataProps {
    children: React.ReactNode
}

export const ErrorDataContext = createContext<ErrorData>({} as ErrorData);

export const ErrorDataProvider = ({ children }: ErrorDataProps) => {

    const [error, setError] = useState<string[]>([]);

    const value = {
        error,
        setError
    }
    return (
        <ErrorDataContext.Provider value={value}>
            {children}
        </ErrorDataContext.Provider>
    )
}