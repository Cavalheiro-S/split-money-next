import { MagnifyingGlass } from '@phosphor-icons/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SearchBarProps {
    className?: string
}

export const SearchBar = ({ className }: SearchBarProps) => {
    return (
        <div className={twMerge('flex items-center w-2/4 gap-4 p-4 mx-auto bg-white border-2 rounded focus-within:border-primary', className)}>
            <MagnifyingGlass className='w-6 h-6 text-gray-500' />
            <input className='w-full text-gray-800 outline-none ' placeholder='Procure um lançamento aqui ...' type="text" />
        </div>
    )
}
