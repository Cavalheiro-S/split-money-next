import TransactionCategoryTranslate from '@/assets/translate/TransactionCategory.json'
import { TransactionCategoryEnum } from '@/enums/TransactionCategoryEnum'
import { AppDispatch, RootState } from '@/store'
import { closeModal } from '@/store/features/modal/ModalSlice'
import { addTransactionAsync, cleanTransactionActive, updateTransactionAsync } from '@/store/features/transaction/TransactionSlice'
import { capitalizeFirstLetter } from '@/utils'
import { Button, Form, Input, Select } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormItem } from 'react-hook-form-antd'
import { useDispatch, useSelector } from 'react-redux'
interface Inputs {
    description: string,
    amount: number,
    date: string,
    type: "income" | "outcome",
    category: string
}

export const RecordForm = () => {

    const [isNewTransaction, setIsNewTransaction] = useState(false)
    const { handleSubmit, formState: { errors }, setValue, control } = useForm<Inputs>()
    const transactionState = useSelector((state: RootState) => state.transactionState)
    const userState = useSelector((state: RootState) => state.userState)
    const dispatch = useDispatch<AppDispatch>()
    const [form] = Form.useForm();

    const initialValues = {
        description: "",
        amount: 0,
        date: moment().format("YYYY-MM-DD"),
        type: "income",
        category: ""
    }

    useEffect(() => {
        if (transactionState.transactionActive.id) {
            const { description, amount, date, type, category } = transactionState.transactionActive

            form.setFieldValue("description", description)
            form.setFieldValue('description', description)
            form.setFieldValue('amount', Number(amount))
            form.setFieldValue('date', moment(date).format('YYYY-MM-DD'))
            form.setFieldValue('type', type)
            form.setFieldValue('category', capitalizeFirstLetter(category))
            setIsNewTransaction(false)
        }
        else
            setIsNewTransaction(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionState.transactionActive])

    const onSubmit = async (data: Inputs) => {
        const { id } = transactionState.transactionActive
        const transactionData: TransactionWithUserId = {
            amount: Number(data.amount),
            category: data.category,
            date: data.date,
            description: data.description,
            type: data.type,
            userId: userState.user.id
        }
        if (id) {
            dispatch(updateTransactionAsync({ id, ...transactionData }))
        }
        else {
            dispatch(addTransactionAsync(transactionData))
        }
        dispatch(closeModal())
        dispatch(cleanTransactionActive())
    }


    const renderCategories = () => {
        const categories = Object.values(TransactionCategoryEnum)
        return categories.map((category, index) => {
            return {
                label: TransactionCategoryTranslate[category as keyof typeof TransactionCategoryTranslate],
                value: category,
                key: category + index.toString()
            }

        })
    }
    return (
        <Form
            form={form}
            onFinish={handleSubmit(onSubmit)}
            initialValues={initialValues} 
            className='flex flex-col gap-6 p-10 text-gray-800'>
            <FormItem
                label="Descrição"
                name="description"
                shouldUpdate
                control={control}>
                <Input placeholder='Descrição' type="text" />
                {errors.description && <span className='text-red-500'>Descrição deve ter entre 3 e 50 caracteres</span>}
            </FormItem>
            <FormItem
                label="Data"
                name="date"
                shouldUpdate
                control={control}>
                <Input placeholder='Data' type="date" />
            </FormItem>
            <FormItem
                label="Valor"
                name="amount"
                shouldUpdate
                control={control}>
                <Input size='large' addonBefore="R$" type='number' />
                {errors.amount && <span className='text-red-500'>Valor deve ser maior que 0</span>}
            </FormItem>

            <FormItem
                label="Tipo"
                name="type"
                shouldUpdate
                control={control}
            >
                <Select placeholder='Tipo'>
                    <Select.Option value="income">Entrada</Select.Option>
                    <Select.Option value="outcome">Despesa</Select.Option>
                </Select>
            </FormItem>

            <FormItem
                label="Categoria"
                name="category"
                shouldUpdate
                control={control}>
                <Select placeholder='Categoria' options={renderCategories()} />
            </FormItem>
            {errors.category && <span className='text-red-500'>Categoria é obrigatória</span>}
            <Button htmlType='submit'>{isNewTransaction ? "Adicionar" : "Atualizar"}</Button>
        </Form>)
}
