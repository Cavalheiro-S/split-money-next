'use client'

import { Button } from "@/components/Button/Button";
import { AppDispatch } from "@/store";
import { signOutAsync } from "@/store/features/user/UserSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";


export default function Page() {

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const handleSignOut = async () => {
        dispatch(signOutAsync())
        router.push("/")
    }

    return (
        <div className="p-4 bg-white rounded">
            <h3>Você tem certeza que quer se desconectar da sua conta ?</h3>
            <div className="flex items-center justify-between gap-2">
                <Link className="text-sm text-gray-500 hover:underline" href="/"> Voltar para página inicial</Link>
                <Button onClick={handleSignOut}>Sim</Button>
            </div>

        </div>
    )
}