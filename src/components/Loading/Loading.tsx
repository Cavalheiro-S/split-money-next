import { SpinnerGap } from "@phosphor-icons/react"
import { Spin } from "antd"

export const Loading = () => {

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <Spin />
            <h3 className='text-primary font-sans font-normal'>Carregando ...</h3>
        </div>
    )
}