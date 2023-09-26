import { AntDesignProvider } from "./AntDesignProvider";
import { ReactReduxProvider } from "./ReactReduxProvider";

interface Props {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    return (
        <ReactReduxProvider>
            <AntDesignProvider>
                {children}
            </AntDesignProvider>
        </ReactReduxProvider>
    )
}