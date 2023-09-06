import { ConfigProvider } from "antd"

interface Props {
    children: React.ReactNode;
}

export const AntDesignProvider = ({ children }: Props) => {

    return (
        <ConfigProvider theme={{
            components: {
                Select: {
                    zIndexPopup: 10000
                }
            }
        }}>
            {children}
        </ConfigProvider>
    )

}