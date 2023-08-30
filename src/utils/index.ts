
export const verifyErrorType = (error: unknown) => {
    if(error instanceof Error) {
        return error.message
    }
}

export const capitalizeFirstLetter = (string: string) => {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export const formatInputMoney = (value: string): number => {
    const valueAsString = value.replace("R$", "")
        .replace(".", "")
        .replace(",", ".")
    return Number(valueAsString)
}