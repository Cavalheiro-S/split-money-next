
import { Record } from '@/components/Record/Record'
import React from 'react'

export default function Transaction() {
    
    const mockTable = {
        title: "Lançamentos",
        row: [
            {
                "Nome": "Ifood",
                "Categoria": "Alimentação",
                "Valor": "R$ 34,45"
            },
            {
                "Nome": "Ifood",
                "Categoria": "Alimentação",
                "Valor": "R$ 34,45"
            },
        ]
    }

    return (
        <div className='flex justify-center w-2/3 min-h-screen pt-10 ml-32'>
            <Record hasButton className='w-full h-fit' {...mockTable}/>
        </div>
    )
}
