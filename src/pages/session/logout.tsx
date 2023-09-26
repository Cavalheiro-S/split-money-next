'use client'

import { AppDispatch } from "@/store";
import { signOutAsync } from "@/store/features/user/UserSlice";
import { Button, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


export default function Page() {

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const handleSignOut = async () => {
        dispatch(signOutAsync())
        router.push("/")
    }

    return (
        <div className="flex flex-col gap-4 p-4 m-auto bg-white rounded col-start-2">
            <Typography.Text className="text-xl">Você tem certeza que quer se desconectar da sua conta ?</Typography.Text>
            <div className="flex items-center justify-between gap-2">
                <Link className="text-sm text-gray-500 hover:underline" href="/"> Voltar para página inicial</Link>
                <Button onClick={handleSignOut}>Sim</Button>
            </div>

        </div>
    )
}