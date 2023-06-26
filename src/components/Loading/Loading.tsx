import { SpinnerGap } from "@phosphor-icons/react"

export const Loading = () => {

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <SpinnerGap className='w-12 h-12 text-primary animate-spin' />
            <h3 className='text-primary font-heading'>Carregando ...</h3>
        </div>
    )
}