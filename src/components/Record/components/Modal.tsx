import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'
import React from 'react'
import { RecordForm } from './Form'


export const RecordModal = () => {
    return (
        <Modal
            title="Adicionar lançamento"
            trigger={<Button>Adicionar</Button>}
            content={<RecordForm />}
        />)
}
