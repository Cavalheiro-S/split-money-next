'use client'

import { AppDispatch, RootState } from '@/store';
import { cleanTransactionActive } from '@/store/features/transaction/TransactionSlice';
import { closeModal, handleModalChange, openModal } from '@/store/features/modal/ModalSlice';
import { X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface ModalProps {
    trigger: React.ReactNode
    content: React.ReactNode
    title: string
}

export const Modal = ({ trigger, content, title }: ModalProps) => {
    const { isOpen } = useSelector((state: RootState) => state.modalState)
    const dispatch = useDispatch<AppDispatch>()

    const handleModal = () => {
        if (!isOpen) {
            dispatch(openModal())
        }
        else {
            dispatch(closeModal())
            dispatch(cleanTransactionActive())
        }
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleModal}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-50" />
            <Dialog.Content className='fixed z-20 w-full p-6 -translate-x-1/2 -translate-y-1/2 rounded left-1/2 top-1/2 bg-background md:w-fit'>
                <div className='flex justify-between mb-6'>
                    <h4 className='text-gray-800 w-fit'>{title}</h4>
                    <Dialog.Close>
                        <X className='w-6 h-6 text-gray-500' />
                    </Dialog.Close>
                </div>
                {content}
            </Dialog.Content>
        </Dialog.Root>
    )
}
