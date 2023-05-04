import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Modal } from '../Modal/Modal'

type RecordRowProps = {
    [key: string]: string | number | React.ReactNode
}

interface RecordProps {
    title: string,
    row: RecordRowProps[],
    hasButton?: boolean,
    className?: string
}

export const Record = ({ title, row, className, hasButton }: RecordProps) => {

    const [open, setOpen] = React.useState(false)

    const renderData = () => {
        if (!row.length) return (
            <>
                <thead>
                    <tr><td className='py-2 text-center text-gray-800'>Nenhum lançamento encontrado</td></tr>
                </thead>
                <tbody className='text-sm text-center text-gray-800'>
                    <tr><td className='py-2 text-gray-400'>Adicione um lançamento para ele aparecer aqui</td></tr>
                    <button className='px-4 py-2 text-white rounded bg-primary'>Adicionar</button>
                </tbody>
            </>
        )
        return (
            <>
                <thead>
                    <tr className='text-sm text-gray-800 border-b-2'>
                        {Object.keys(row[0]).map((key, index) => (
                            <th key={key + index} className='p-4 text-start'>{key}</th>
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
            <div className='flex justify-between'>
                <h3 className='font-semibold text-gray-800 font-heading'>{title}</h3>
                {hasButton && (
                    <Modal
                        title="Adicionar lançamento"
                        open={open}
                        setOpen={setOpen}
                        trigger={<button className='px-4 py-2 rounded bg-primary w-fit'>Adicionar</button>}
                        content={
                            <form className='flex flex-col gap-6 text-gray-800 w-80'>
                                <label className='flex flex-col gap-1 text-sm '>
                                    Descrição
                                    <input placeholder='Descrição' className='px-2 py-2 bg-gray-200 rounded outline-none' type="text" />
                                </label>
                                <label className='flex flex-col gap-1 text-sm'>
                                    Valor
                                    <input placeholder='R$' className='px-2 py-2 bg-gray-200 rounded outline-none' type="number" />
                                </label>
                                <label className='flex flex-col gap-1 text-sm'>
                                    Categoria
                                    <input className='px-2 py-2 bg-gray-200 rounded outline-none' type="text" />
                                </label>
                                <button className='self-end px-4 py-2 text-white rounded w-fit bg-primary'>Adicionar</button>
                            </form>
                        } />

                )}
            </div>
            <table className='w-full'>
                {renderData()}
            </table>
        </div>
    )
}
