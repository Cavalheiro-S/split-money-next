import TransactionCategoryTranslate from '@/assets/translate/TransactionCategory.json'
import { Button } from '@/components/Button/Button'
import { TransactionCategoryEnum } from '@/enums/TransactionCategoryEnum'
import { AppDispatch, RootState } from '@/store'
import { closeModal } from '@/store/features/modal/ModalSlice'
import { addTransactionAsync, cleanTransactionActive, updateTransactionAsync } from '@/store/features/transaction/TransactionSlice'
import { capitalizeFirstLetter } from '@/utils'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from '../Input/Input'

interface Inputs {
    description: string,
    amount: number,
    date: string,
    type: "income" | "outcome",
    category: string
}

export const RecordForm = () => {

    const [isNewTransaction, setIsNewTransaction] = useState(false)
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Inputs>()
    const { transactionState, userState } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (transactionState.transactionActive.id) {
            const { description, amount, date, type, category } = transactionState.transactionActive

            setValue('description', description)
            setValue('amount', amount)
            setValue('date', moment(date).format('YYYY-MM-DD'))
            setValue('type', type)
            setValue('category', capitalizeFirstLetter(category))
            setIsNewTransaction(false)
        }
        else
            setIsNewTransaction(true)
    }, [transactionState.transactionActive, setValue])

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const { id } = transactionState.transactionActive
        if (id) {
            dispatch(updateTransactionAsync({ ...data, id }))
        }
        else {
            const transaction: Transaction = {
                amount: data.amount,
                category: data.category,
                date: data.date,
                description: data.description,
                type: data.type
            }
            dispatch(addTransactionAsync({ transaction, userId: userState.user.id }))
        }
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
                <Input.Root>
                    <Input.Input {...register("description", { required: true, minLength: 3, maxLength: 50 })} placeholder='Descrição' type="text" />
                </Input.Root>
                {errors.description && <span className='text-red-500'>Descrição deve ter entre 3 e 50 caracteres</span>}
            </label>
            <label className='flex flex-col gap-1 text-sm'>
                Data
                <Input.Root>
                    <Input.Input defaultValue={moment().format("YYYY-MM-DD")} {...register("date")} type="date" />
                </Input.Root>
            </label>
            <label className='flex flex-col gap-1 text-sm'>
                Valor
                <Input.Root>
                    <Controller name="amount"
                        control={control}
                        render={props => {
                            return <Input.Money {...props.field} />
                        }} />
                    {errors.amount && <span className='text-red-500'>Valor deve ser maior que 0</span>}
                </Input.Root>
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
            <Button>{isNewTransaction ? "Adicionar" : "Atualizar"}</Button>
        </form>)
}
