import { RecordModal } from "./Modal"
import { AppDispatch } from '@/store'
import { openModal } from '@/store/features/modal/ModalSlice'
import { deleteTransactionAsync, setTransactionActive } from '@/store/features/transaction/TransactionSlice'
import { capitalizeFirstLetter } from '@/utils'
import { CreditCard, Money, Pencil, Trash } from '@phosphor-icons/react'
import moment from "moment"
import { useRouter } from "next/router"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'

interface RecordProps {
  title: string,
  data: Transaction[],
  children?: React.ReactNode,
  hasActions?: boolean,
  className?: string,
}


export const RecordRoot = ({ title, className, data, children, hasActions }: RecordProps) => {

  const [rowIsClicked, setRowIsClicked] = useState({
    isClicked: false,
    row: 0
  })
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = async (id: string) => dispatch(deleteTransactionAsync(id))

  const handleEdit = async (transaction: Transaction) => {
    if (transaction.id) {
      dispatch(setTransactionActive(transaction))
      dispatch(openModal())
    }
  }

  const handleRowClick = (index: number) => {
    if (!hasActions){
      router.push(`/transaction/`)
      dispatch(openModal())
      dispatch(setTransactionActive(data[index]))
    }
    setRowIsClicked({
      isClicked: !rowIsClicked.isClicked,
      row: index
    })
  }

  return (
    <div className={twMerge('flex flex-col gap-10 p-8 bg-white rounded', className)}>
      <div className='flex justify-between'>
        <h3 className='font-semibold text-gray-800 font-heading'>{title}</h3>
        {children}
      </div>
      <table className='w-full'>
        <tbody className=''>
          <tr>
            <th className='p-4 text-gray-800 text-start'></th>
            <th className='p-4 text-gray-800 text-start'>Descrição</th>
            <th className='p-4 text-gray-800 text-start'>Data</th>
            <th className='p-4 text-gray-800 text-start'>Categoria</th>
            <th className='p-4 text-gray-800 text-start'>Valor</th>
          </tr>
          {data && Array.isArray(data) && data.map((transaction, index) => {
            return (
              <>
                <tr
                  onClick={() => handleRowClick(index)}
                  key={transaction + index.toString()}
                  className={'text-sm text-center text-gray-800 transition-all hover:bg-gray-100'}>
                  <td className='flex justify-center py-4 text-gray-800 text-start'>
                    {transaction.type === "income"
                      ? <Money className="h-10 w-10 p-1 rounded-full bg-green-200 text-green-500" />
                      : <CreditCard className="h-10 w-10 p-1 rounded-full bg-red-200 text-red-500" />}
                  </td>
                  <td className='p-4 text-gray-800 text-start'>{capitalizeFirstLetter(transaction.description)}</td>
                  <td className='p-4 text-gray-800 text-start'>{moment(transaction.date).format("DD/MM/YYYY")}</td>
                  <td className='p-4 text-gray-800 text-start'>{transaction.category}</td>
                  <td className='p-4 text-gray-800 text-start'>R$ {transaction.amount}</td>
                  {hasActions && rowIsClicked.isClicked && rowIsClicked.row === index &&
                    <td>
                      <div className="flex gap-2">
                        <Pencil className='w-6 h-6 hover:text-blue-300 row-start-1' onClick={() => handleEdit(transaction)} />
                        <Trash className='w-6 h-6 hover:text-red-300 row-start-1' onClick={() => handleDelete(transaction.id?.toString() ?? "0")} />
                      </div>
                    </td>}
                </tr>
              </>
            )
          })
          }
        </tbody>
      </table>
    </div>
  )
}


export const Record = {
  Root: RecordRoot,
  Modal: RecordModal,
}