'use client'

import { Record } from '@/components/Record/Record'
import { AppDispatch, RootState } from '@/store';
import { setTransactionsAsync } from '@/store/features/transaction/TransactionSlice';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Transaction() {
    const { transactions } = useSelector((state: RootState) => state.transactionState)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const loadData = async () => await setTransactionsAsync()
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            <Record data={transactions} hasButton className='w-full h-fit' title='Lançamentos' />
        </div>
    )
}
