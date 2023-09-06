'use client'

import { RootState } from '@/store';
import { HomeOutlined, LogoutOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const NavBar = () => {
    const userState = useSelector((state: RootState) => state.userState)
    const [current, setCurrent] = useState('dashboard');

    const items: MenuProps['items'] = [
        {
            label: (<Link href='/dashboard'>Visão Geral</Link>),
            key: 'dashboard',
            icon: <HomeOutlined />,
            disabled: !userState.isAuthenticated,
        },
        {
            label: (<Link href='/transaction'>Transações</Link>),
            key: 'transaction',
            icon: <PlusCircleOutlined />,
            disabled: !userState.isAuthenticated,
        },
        {
            label: (<Link href='/session/logout'>Sair</Link>),
            key: 'signout',
            icon: <LogoutOutlined />,
            disabled: !userState.isAuthenticated,
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu className='absolute top-0 left-0 w-48 h-full' onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />   
    )
}
