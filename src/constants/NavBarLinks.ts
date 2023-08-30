import { Gear, House, Icon, PlusCircle, SignOut } from "@phosphor-icons/react";

export interface NavBarLink {
    name: string;
    path: string;
    icon: Icon;
    auth?: boolean;
    type: "screen" | "config"
}

export const NavBarLinks: Array<NavBarLink> = [
    {
        name: 'Visão Geral',
        path: '/',
        icon: House,
        auth: false,
        type: "screen"
    },
    {
        name: 'Lançamentos',
        path: '/transaction',
        icon: PlusCircle,
        auth: true,
        type: "screen"
    },
    {
        name: 'Sair',
        path: '/session/logout',
        icon: SignOut,
        auth: true,
        type: "config"
    }
];