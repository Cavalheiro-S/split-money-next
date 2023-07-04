import TransactionCategoryTranslate from '@/assets/translate/TransactionCategory.json'
import { Button } from '@/components/Button/Button'
import { TransactionCategoryEnum } from '@/enums/TransactionCategoryEnum'
import { AppDispatch } from '@/store'
import { addTransactionAsync } from '@/store/features/transaction/TransactionSlice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

interface Inputs {
    description: string,
    amount: number,
    date: string,
    type: string,
    category: string
}

export const RecordForm = () => {

    const dispatch = useDispatch<AppDispatch>()

    const onSubmit: SubmitHandler<Inputs> = async data => {
        dispatch(addTransactionAsync({ ...data }))
    }

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

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
                <input defaultValue={new Date().toString()} {...register("date")} placeholder='Data' className='px-2 py-2 bg-gray-200 rounded outline-none' type="date" />
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
            <Button>Adicionar</Button>
        </form>)
}
