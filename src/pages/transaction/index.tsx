'use client'

import { Loading } from '@/components/Loading/Loading';
import { TableRecord } from '@/components/Record/Record';
import { AppDispatch, RootState } from '@/store';
import { setTransactionsAsync } from '@/store/features/transaction/TransactionSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Page() {
    const dispatch = useDispatch<AppDispatch>()
    const transactionState = useSelector((state: RootState) => state.transactionState)
    const userState = useSelector((state: RootState) => state.userState)
    const router = useRouter()

    useEffect(() => {
        if (!userState.user.id) {
            toast.clearWaitingQueue()
            toast.error("Sessão expirada")
            router.replace("/session/login")
            return
        }
        dispatch(setTransactionsAsync(userState.user.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.user.id])

    return transactionState.isLoading || userState.loading ? <Loading /> : (
        <div className='flex justify-center min-h-screen px-10 pt-10'>
            <TableRecord data={transactionState.transactions} hasActions className='w-full h-fit' title='Lançamentos' />
        </div>
    )
}
