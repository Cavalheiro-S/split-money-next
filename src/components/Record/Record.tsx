import { TransactionDTO } from '@/data/dtos/TransactionDTO'
// import { useTransaction } from '@/hooks/useTransaction'
import { AppDispatch } from '@/store'
import { deleteTransactionAsync, updateTransactionAsync } from '@/store/features/transaction/TransactionSlice'
import { capitalizeFirstLetter } from '@/utils'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import { RecordModal } from './components/Modal'

interface RecordProps {
  title: string,
  hasButton?: boolean,
  className?: string,
  data: TransactionDTO[]
}

export const Record = ({ title, className, hasButton, data }: RecordProps) => {

  const [rowIsClicked, setRowIsClicked] = useState({
    isClicked: false,
    row: 0
  })
  
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = async (id: string) => dispatch(deleteTransactionAsync(id))

  const handleEdit = async (transaction: TransactionDTO) => dispatch(updateTransactionAsync(transaction))


  return (
    <div className={twMerge('flex flex-col gap-10 p-8 bg-white rounded', className)}>
      <div className='flex justify-between'>
        <h3 className='font-semibold text-gray-800 font-heading'>{title}</h3>
        {hasButton && <RecordModal/>}
      </div>
      <table className='w-full'>
        <tbody className=''>
          <tr>
            <th className='p-4 text-gray-800 text-start'>Descrição</th>
            <th className='p-4 text-gray-800 text-start'>Data</th>
            <th className='p-4 text-gray-800 text-start'>Tipo</th>
            <th className='p-4 text-gray-800 text-start'>Categoria</th>
            <th className='p-4 text-gray-800 text-start'>Valor</th>
          </tr>
          {data && Array.isArray(data) && data.map((transaction, index) => {
            return (
              <>
                <tr onClick={() => setRowIsClicked({
                  isClicked: !rowIsClicked.isClicked,
                  row: index
                })}
                  key={transaction + index.toString()}
                  className={'text-sm text-center text-gray-800 transition-all '}>
                  <td className='p-4 text-gray-800 text-start'>{capitalizeFirstLetter(transaction.description)}</td>
                  <td className='p-4 text-gray-800 text-start'>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className='p-4 text-gray-800 text-start'>{capitalizeFirstLetter(transaction.type)}</td>
                  <td className='p-4 text-gray-800 text-start'>{transaction.category}</td>
                  <td className='p-4 text-gray-800 text-start'>{transaction.amount}</td>
                  {rowIsClicked.isClicked && rowIsClicked.row === index &&
                    <td className='z-20'>
                      <Trash className='w-6 h-6 hover:text-red-300' onClick={() => handleDelete(transaction.id?.toString() ?? "0")} />
                      <Pencil className='w-6 h-6 hover:text-blue-300' onClick={() => handleEdit(transaction)} />
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