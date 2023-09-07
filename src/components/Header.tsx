import Image from "next/image"
import Logo from "../assets/imgs/Logo.svg"
import { Divider } from "antd"

export const Header = () => {

    return (
        <>
            <header className="flex items-center h-20 gap-10 px-20 bg-white border-b-2">
                <Image src={Logo} width={100} height={100} alt="logo" />
                <span>Versão de Teste</span>
            </header>
        </>
    )
}