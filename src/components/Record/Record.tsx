import { AppDispatch } from '@/store'
import { openModal } from '@/store/features/modal/ModalSlice'
import { deleteTransactionAsync, setTransactionActive } from '@/store/features/transaction/TransactionSlice'
import { capitalizeFirstLetter } from '@/utils'
import { CreditCard, Money, Pencil, Trash } from '@phosphor-icons/react'
import { Divider, Space, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import moment from "moment"
import { useRouter } from "next/router"
import React from 'react'
import { useDispatch } from 'react-redux'
import { RecordModal } from "./Modal"

interface RecordProps {
  title: string,
  data: Transaction[],
  children?: React.ReactNode,
  hasActions?: boolean,
  className?: string,
}


export const RecordRoot = ({ title, className, data, children, hasActions }: RecordProps) => {

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const columns: ColumnsType<Transaction> = [
    {
      render: (_, record) => {
        if (record.type === "income")
          return <Money className='w-8 h-8 text-green-500' />
        return <CreditCard className='w-8 h-8 text-red-500' />
      }
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: (text: Date) => <p>{moment(text).format('DD/MM/YYYY')}</p>
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => <span>{capitalizeFirstLetter(text)}</span>
    },
    {
      title: 'Valor',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Ações',
      key: 'edit',
      render: (_, record) => (
        <Space>
          <span className='cursor-pointer hover:text-blue-600' onClick={() => handleEdit(record)}>Editar</span>
          <span className='cursor-pointer hover:text-red-600' onClick={() => handleDelete(record.id ?? "")}>Deletar</span>
        </Space>
      )
    },
  ]

  const handleDelete = async (id: string) => dispatch(deleteTransactionAsync(id))

  const handleEdit = async (transaction: Transaction) => {
    if (transaction.id) {
      dispatch(setTransactionActive(transaction))
      dispatch(openModal())
    }
  }

  const handleRowClick = (record: Transaction) => {
    if (!hasActions) {
      router.push(`/transaction/`)
      dispatch(openModal())
      dispatch(setTransactionActive(record))
    }
  }

  return (
    <div>
      {hasActions && (
        <>
          <RecordModal />
          <Divider />
        </>
      )}
      <Table columns={columns} dataSource={data} onRow={record => {
        return {
          onClick: () => handleRowClick(record)
        }
      }} />
    </div>

  )
}


export const Record = {
  Root: RecordRoot,
  Modal: RecordModal,
}