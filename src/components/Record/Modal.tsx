import { Button } from '@/components/Button/Button'
import { Modal } from '@/components/Modal/Modal'
import React from 'react'
import { RecordForm } from './Form'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'


export const RecordModal = () => {
    const {transactionActive} = useSelector((state: RootState) => state.transactionState)
    return (
        <Modal
            title={transactionActive.id ? 'Editar Lançamento' : 'Adicionar Lançamento'}
            trigger={<Button>Adicionar</Button>}
            content={<RecordForm />}
        />)
}
