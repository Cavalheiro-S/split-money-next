'use client'

import { Record } from '@/components/Record/Record';
import { AppDispatch, RootState } from '@/store';
import { setTransactionsAsync } from '@/store/features/transaction/TransactionSlice';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Transaction() {
    const dispatch = useDispatch<AppDispatch>()
    const { transactionState, userState } = useSelector((state: RootState) => state)
    const { data: session } = useSession()

    useEffect(() => {
        if (!userState.user.id) return
        dispatch(setTransactionsAsync(userState.user.id))
    }, [dispatch, userState.user.id])

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            <Record.Root data={transactionState.transactions} hasActions className='w-full h-fit' title='Lançamentos'>
                <Record.Modal />
            </Record.Root>
        </div>
    )
}
