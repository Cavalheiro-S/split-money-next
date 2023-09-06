'use client'

import { Record } from '@/components/Record/Record';
import { AppDispatch, RootState } from '@/store';
import { setTransactionsAsync } from '@/store/features/transaction/TransactionSlice';
import { setUserIsAuthenticated } from '@/store/features/user/UserSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Transaction() {
    const dispatch = useDispatch<AppDispatch>()
    const transactionState = useSelector((state: RootState) => state.transactionState)
    const userState = useSelector((state: RootState) => state.userState)
    const router = useRouter()

    useEffect(() => {
        if (!userState.user.id) {
            toast.error("Sessão expirada")
            router.replace("/session/login")
        }
        dispatch(setTransactionsAsync(userState.user.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.user.id])

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            <Record.Root data={transactionState.transactions} hasActions className='w-full h-fit' title='Lançamentos'>
                <Record.Modal />
            </Record.Root>
        </div>
    )
}
