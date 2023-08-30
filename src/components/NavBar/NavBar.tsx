'use client'

import { NavBarLinks } from '@/constants/NavBarLinks';
import { RootState } from '@/store';
import { ArrowsOutLineHorizontal } from '@phosphor-icons/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

export const NavBar = () => {

    const router = useRouter()
    const { user } = useSelector((state: RootState) => state.userState)
    const [isNavBarOpen, setIsNavBarOpen] = useState(true)

    const renderLink = () => {
        const linksAvailables = NavBarLinks.filter(link => {
            if (link.auth && !user?.id)
                return false
            if (link.auth && user?.id)
                return true
            return true
        })
        return linksAvailables.map((linkAvailable, index) => (
            <li
                key={linkAvailable.name + index}
                className={twMerge("flex items-center gap-2", router.pathname === linkAvailable.path ? "text-gray-800" : "text-gray-500")}>
                <linkAvailable.icon className='w-6 h-6' />
                <Link href={linkAvailable.path}>{linkAvailable.name}</Link>
            </li>
        ))
    }
    return (
        <nav className={
            twMerge('absolute top-0 left-0 z-10 grid h-full grid-rows-2 pt-20 font-sans text-sm bg-white border-t-2 border-gray-200 w-60 transition-all',
                !isNavBarOpen && "-translate-x-full")}>
            <span
                onClick={() => setIsNavBarOpen(!isNavBarOpen)}
                className={twMerge('absolute -right-14 mt-0 hover:text-primary hover:cursor-pointer bg-white p-2')}>
                <ArrowsOutLineHorizontal />
                Menu
            </span>
            <ul className='flex flex-col gap-6 px-4'>
                {renderLink()}
                {!user?.id && <Link className='text-primary hover:text-primary hover:text-opacity-75' href={"/session/login"}>Faça login para acessar</Link>}
            </ul>
            <ul className='flex flex-col px-4'>
                {user?.id
                    && (<>
                        Logado como: <br />
                        <span className='font-semibold'>{`${user?.name} - ${user?.id}`}</span>
                    </>
                    )
                }
            </ul>
        </nav>
    )
}
