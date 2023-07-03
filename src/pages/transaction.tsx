'use client'

import { Record } from '@/components/Record/Record'
import { useTransaction } from '@/hooks/useTransaction'
import { RootState } from '@/store';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function Transaction() {
    const { getTransactions } = useTransaction();
    const { transactions } = useSelector((state: RootState) => state.transactionState)

    useEffect(() => {
        const loadData = async () => await getTransactions()
        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            <Record data={transactions} hasButton className='w-full h-fit' title='Lançamentos' />
        </div>
    )
}
