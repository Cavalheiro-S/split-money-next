'use client'

import { NavBarLink, NavBarLinks } from '@/constants/NavBarLinks';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createUserAsync, signinAsync } from '@/store/features/user/UserSlice';
import { useEffect } from 'react';

export const NavBar = () => {

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        if (!session?.user?.email || !session?.user?.name) return
        dispatch(signinAsync({ email: session.user.email, password: "123456" }))

    }, [session?.user, dispatch])

    const renderLink = (navBarLink: NavBarLink, index: number) => {
        return (
            <li
                key={navBarLink.name + index}
                className={twMerge("flex items-center gap-2", router.pathname === navBarLink.path ? "text-gray-800" : "text-gray-500")}>
                <navBarLink.icon className='w-6 h-6' />
                <Link href={navBarLink.path}>{navBarLink.name}</Link>
            </li>
        )
    }
    return (
        <nav className='grid grid-rows-2 absolute top-0 left-0 z-10 h-full pt-20 font-sans text-sm bg-white border-t-2 border-gray-200 w-60'>
            <ul className='flex flex-col gap-6 px-4'>
                {NavBarLinks.map(renderLink)}
            </ul>
            <ul className='flex flex-col px-4'>
                {session
                    ? (<>
                        Logado como: <br />
                        <span className='font-semibold'>{session.user?.name}</span>
                        <Button onClick={() => signOut()}>Deslogar</Button>
                    </>
                    )
                    : <Button onClick={() => signIn()}>Logar</Button>
                }
            </ul>
        </nav>
    )
}
