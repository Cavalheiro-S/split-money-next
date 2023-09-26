import { Modal } from '@/components/Modal/Modal'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { RecordForm } from './Form'
import { Button } from 'antd'


export const RecordModal = () => {
    const { transactionActive } = useSelector((state: RootState) => state.transactionState)
    return (
        <Modal
            title={transactionActive.id ? 'Editar Lançamento' : 'Adicionar Lançamento'}
            trigger={<Button>Adicionar</Button>}
            content={<RecordForm />}
        />)
}
