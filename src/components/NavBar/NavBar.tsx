
import { NavBarLink, NavBarLinks } from '@/constants/NavBarLinks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

export const NavBar = () => {

    const router = useRouter()
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
        <nav className='absolute top-0 left-0 z-10 h-full pt-20 font-sans text-sm bg-white border-t-2 border-gray-200 w-60'>
            <ul className='flex flex-col gap-6 px-4'>
                {NavBarLinks.map(renderLink)}
            </ul>
        </nav>
    )
}
