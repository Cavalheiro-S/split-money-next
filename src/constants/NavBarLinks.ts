import { Gear, House, Icon, PlusCircle, SignOut } from "@phosphor-icons/react";

export interface NavBarLink {
    name: string;
    path: string;
    icon: Icon;
    type: "screen" | "config"
}

export const NavBarLinks: Array<NavBarLink> = [
    {
        name: 'Visão Geral',
        path: '/',
        icon: House,
        type: "screen"
    },
    {
        name: 'Lançamentos',
        path: '/transaction',
        icon: PlusCircle,
        type: "screen"
    },
    {
        name: 'Configurações',
        path: '/settings',
        icon: Gear,
        type: "config"
    },
    {
        name: 'Sair',
        path: '/logout',
        icon: SignOut,
        type: "config"
    }
];