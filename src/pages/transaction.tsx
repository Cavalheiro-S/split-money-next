'use client'

import { Record } from '@/components/Record/Record'
import { useTransaction } from '@/hooks/useTransaction'
import { useEffect, useState } from 'react'

export default function Transaction() {

    const [error, setError] = useState<string>('')
    const { getTransactions } = useTransaction();
    
    useEffect(() => {
        const loadData = async () => {
            const { result } = await getTransactions()
        }
        loadData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            {!error && <Record hasButton className='w-full h-fit' title='Lançamentos' />}
        </div>
    )
}
