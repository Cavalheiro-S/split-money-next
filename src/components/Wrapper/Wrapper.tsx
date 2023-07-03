import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Loading } from '../Loading/Loading'
import { toast } from 'react-toastify'

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    const { loading, error } = useSelector((state: RootState) => state.serviceApiState)

    return (
        <>
            {loading ? <Loading /> : children}
            {error && toast.error(error)}
        </>
    )
}
