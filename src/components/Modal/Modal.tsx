'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@phosphor-icons/react';


interface ModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    trigger: React.ReactNode
    content: React.ReactNode
    title: string
}

export const Modal = ({ open, setOpen, trigger, content, title }: ModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-50" />
            <Dialog.Content className='fixed z-20 w-full p-6 -translate-x-1/2 -translate-y-1/2 rounded left-1/2 top-1/2 bg-background md:w-fit'>
                <div className='flex justify-between mb-6'>
                    <h4 className='text-gray-800 w-fit'>{title}</h4>
                    <Dialog.Close>
                        <X className='w-6 h-6 text-gray-500'/>
                    </Dialog.Close>
                </div>
                {content}
            </Dialog.Content>
        </Dialog.Root>
    )
}
