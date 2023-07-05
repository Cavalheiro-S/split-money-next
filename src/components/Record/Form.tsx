import TransactionCategoryTranslate from '@/assets/translate/TransactionCategory.json'
import { Button } from '@/components/Button/Button'
import { TransactionCategoryEnum } from '@/enums/TransactionCategoryEnum'
import { AppDispatch, RootState } from '@/store'
import { closeModal } from '@/store/features/modal/ModalSlice'
import { addTransactionAsync, cleanTransactionActive, updateTransactionAsync } from '@/store/features/transaction/TransactionSlice'
import { capitalizeFirstLetter } from '@/utils'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface Inputs {
    description: string,
    amount: number,
    date: string,
    type: "income" | "outcome",
    category: string
}

export const RecordForm = () => {

    const [newTransaction, setNewTransaction] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>()
    const { transactionActive } = useSelector((state: RootState) => state.transactionState)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (transactionActive.id) {
            const { description, amount, date, type, category } = transactionActive
            setValue('description', description)
            setValue('amount', amount)
            setValue('date', moment(date).format('YYYY-MM-DD'))
            setValue('type', type)
            setValue('category', capitalizeFirstLetter(category))
            setNewTransaction(false)
        }   
        else
            setNewTransaction(true)
    }, [transactionActive, setValue])

    const onSubmit: SubmitHandler<Inputs> = async data => {
        if (transactionActive.id) {
            const { id } = transactionActive
            dispatch(updateTransactionAsync({ ...data, id }))
        }
        else
            dispatch(addTransactionAsync({ ...data }))
        dispatch(closeModal())
        dispatch(cleanTransactionActive())
    }


    const renderCategories = () => {
        const categories = Object.values(TransactionCategoryEnum)
        return categories.map((category, index) => {
            return (
                <option key={category + index.toString()} value={category}>{
                    TransactionCategoryTranslate[category as keyof typeof TransactionCategoryTranslate]
                }</option>
            )
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 text-gray-800 w-80'>
            <label className='flex flex-col gap-1 text-sm '>
                Descrição
                {/* Criar componente estilizado para input */}
                <input {...register("description", { required: true, minLength: 3, maxLength: 50 })} placeholder='Descrição' className='px-2 py-2 bg-gray-200 rounded outline-none' type="text" />
                {errors.description && <span className='text-red-500'>Descrição deve ter entre 3 e 50 caracteres</span>}
            </label>
            <label className='flex flex-col gap-1 text-sm'>
                Data
                <input defaultValue={moment().format("YYYY-MM-DD")} {...register("date")} type="date" className='px-2 py-2 bg-gray-200 rounded outline-none' />
            </label>
            <label className='flex flex-col gap-1 text-sm'>
                Valor
                <input {...register("amount", { min: 0, required: true })} placeholder='R$' min={0} className='px-2 py-2 bg-gray-200 rounded outline-none' type="number" />
                {errors.amount && <span className='text-red-500'>Valor deve ser maior que 0</span>}
            </label>
            <label className='flex flex-col gap-1 text-sm'>
                Tipo
                <select defaultValue="income" {...register("type",)} className='px-2 py-2 bg-gray-200 rounded outline-none'>
                    <option value='income'>Entrada</option>
                    <option value='outcome'>Saída</option>
                </select>
            </label>
            <label className='flex flex-col gap-1 text-sm'>
                Categoria
                <select {...register("category", { required: true })} className='px-2 py-2 bg-gray-200 rounded outline-none'>
                    {renderCategories()}
                </select>
                {errors.category && <span className='text-red-500'>Categoria é obrigatória</span>}
            </label>
            <Button>{newTransaction ? "Adicionar" : "Atualizar"}</Button>
        </form>)
}
