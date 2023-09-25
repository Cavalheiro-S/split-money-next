import { AntDesignProvider } from "./AntDesignProvider";
import { NextAuthProvider } from "./NextAuthProvider";
import { ReactReduxProvider } from "./ReactReduxProvider";

interface Props {
    pageProps: any;
    children: React.ReactNode
}

export const Providers = ({ pageProps: { session }, children }: Props) => {
    return (
        <ReactReduxProvider>
            <NextAuthProvider session={session}>
                <AntDesignProvider>
                    {children}
                </AntDesignProvider>
            </NextAuthProvider>
        </ReactReduxProvider>
    )
}