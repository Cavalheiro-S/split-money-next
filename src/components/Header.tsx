import Image from "next/image"
import { useRouter } from "next/navigation"
import Logo from "../assets/imgs/Logo.svg"

export const Header = () => {

    const router = useRouter()
    return (
        <>
            <header className="flex items-center w-full h-full col-span-2 gap-10 px-20 bg-white border-b-2">
                <Image src={Logo} width={100} height={100} alt="logo" onClick={() => router.push("/")}/>
            </header>
        </>
    )
}