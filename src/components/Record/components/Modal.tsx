import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'
import React from 'react'
import { RecordForm } from './Form'

interface RecordModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const RecordModal = ({ open, setOpen }: RecordModalProps) => {
    return (
        <Modal
            title="Adicionar lançamento"
            open={open}
            setOpen={setOpen}
            trigger={<Button>Adicionar</Button>}
            content={<RecordForm />}
        />)
}
