'use client'

import { AppDispatch, RootState } from '@/store';
import { cleanTransactionActive } from '@/store/features/transaction/TransactionSlice';
import { closeModal, handleModalChange, openModal } from '@/store/features/modal/ModalSlice';
import { X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal as ModalAnt } from "antd"

interface ModalProps {
    trigger?: React.ReactNode
    content: React.ReactNode
    title?: string
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
        <div className='flex justify-end'>
            <Button onClick={handleModal}>
                Adicionar
            </Button>
            <ModalAnt open={isOpen} onCancel={handleModal} footer={[]}>
                {content}
            </ModalAnt>
        </div>
    )
}
