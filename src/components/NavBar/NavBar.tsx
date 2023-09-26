import { RootState } from '@/store';
import { HomeOutlined, LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const NavBar = () => {
    const router = useRouter()
    const userState = useSelector((state: RootState) => state.userState)
    const [current, setCurrent] = useState('dashboard');

    const items: MenuProps['items'] = [
        {
            label: (<span>Visão Geral</span>),
            key: 'dashboard',
            icon: <HomeOutlined />,
            disabled: !userState.isAuthenticated,
            onClick: () => { router.push("/dashboard") }
        },
        {
            label: (<span>Transações</span>),
            key: 'transaction',
            icon: <PlusCircleOutlined />,
            disabled: !userState.isAuthenticated,
            onClick: () => { router.push("/transaction") }
        },
        {
            label: (<span>Sair</span>),
            key: 'signout',
            icon: <LogoutOutlined />,
            disabled: !userState.isAuthenticated,
            onClick: () => { router.push("/session/logout") }
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        userState.isAuthenticated
            ? <Menu
                className='top-0 left-0 w-48 h-full border-2 border-green-500 col-start-1 row-span-2'
                onClick={onClick}
                selectedKeys={[current]}
                mode="vertical"
                items={items} />
            : null
    )
}
