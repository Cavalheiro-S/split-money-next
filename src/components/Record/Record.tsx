import React from 'react'
import { twMerge } from 'tailwind-merge'

type RecordRowProps = {
    [key: string]: string | number | React.ReactNode
}

interface RecordProps {
    title: string,
    row: RecordRowProps[],
    className?: string
}

export const Record = ({ title, row, className }: RecordProps) => {

    const renderData = () => {
        if (!row.length) return (
            <tbody className='text-sm text-center text-gray-800'>
                <tr><td className='py-2'>Nenhum lançamento encontrado</td></tr>
                <tr><td className='py-2 text-gray-400'>Adicione um lançamento para ele aparecer aqui</td></tr>
                <button className='px-4 py-2 text-white rounded bg-primary'>Adicionar</button>
            </tbody>
        )
        return (
            <>
                <thead>
                    <tr className='text-sm text-gray-800 border-b-2'>
                        {Object.keys(row[0]).map((key, index) => (
                            <th key={key + index} className='p-4'>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {row.map((item, index) => (
                        <tr key={index} className='text-sm text-gray-800 border-b-2'>
                            {Object.values(item).map((value, index) => (
                                <td key={value?.toString() + index.toString()} className='p-4'>{value}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </>
        )
    }

    return (
        <div className={twMerge('flex flex-col gap-10 p-8 bg-white rounded', className)}>
            <h3 className='font-semibold text-gray-800 font-heading'>{title}</h3>
            <table className='w-full'>
                {renderData()}
            </table>
        </div>
    )
}
