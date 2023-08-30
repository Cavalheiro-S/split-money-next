import Image from "next/image"
import Logo from "../assets/imgs/Logo.svg"

export const Header = () => {

    return (
        <header className="flex items-center h-20 gap-10 px-20 bg-white ">
            <Image src={Logo} width={100} height={100} alt="logo" />
            <span>Versão de Teste</span>
        </header>
    )
}