'use client'

import { Record } from '@/components/Record/Record';
import { AppDispatch, RootState } from '@/store';
import { setTransactionsAsync } from '@/store/features/transaction/TransactionSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Transaction() {
    const dispatch = useDispatch<AppDispatch>()
    const { transactions } = useSelector((state: RootState) => state.transactionState)

    useEffect(() => {
        dispatch(setTransactionsAsync())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            <Record.Root data={transactions} hasActions className='w-full h-fit' title='Lançamentos'>
                <Record.Modal />
            </Record.Root>
        </div>
    )
}
