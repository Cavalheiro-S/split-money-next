import { Slot } from "@radix-ui/react-slot"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: "primary" | "secondary" | "danger",
    aschild?: boolean
}

export const Button = (props: ButtonProps) => {

    const Component = props.aschild ? Slot : "button"

    const renderStyle = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-transparent text-primary border-primary hover:bg-primary-light",
        danger: "bg-red-300 text-red-800 hover:bg-red-500 hover:text-white"
    }
    return (
        <Component
            {...props}
            className={twMerge(
                "flex items-center justify-center gap-2 px-4 py-2 rounded border transition",
                renderStyle[props.color || "primary"],
                props.className)}>
            {props.children}
        </Component>
    )
}