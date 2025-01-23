
import { BiBook, BiDollarCircle } from 'react-icons/bi';
import { BsBrush, BsFillGearFill, BsFillPeopleFill } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { create } from 'zustand';

export interface ISidebarMenuProps {
    icon: IconType;
    title: string;
    path: string;
    active: boolean;
}

export interface ISidebarProps {
    current: string;
    menu: ISidebarMenuProps[];
}

const stateDefault: ISidebarProps = {
    current: "",
    menu: [
        {
            icon: BsBrush,
            title: 'Criar história',
            path: `/dashboard`,
            active: true,
        },
        {
            icon: BiBook,
            title: 'Minha Biblioteca',
            path: `/dashboard/biblioteca`,
            active: false,
        },
        {
            icon: BsFillPeopleFill,
            title: 'Histórias da comunidade',
            path: `/dashboard/comunidade`,
            active: false,
        },
        {
            icon: BiDollarCircle,
            title: 'Incluir saldo',
            path: `/dashboard/saldo`,
            active: false,
        },
        // {
        //     icon: BsFillGearFill,
        //     title: 'Preferências',
        //     path: `/dashboard/configuracoes`,
        //     active: false,
        // },
    ]
};

// ** Store ** //
type Store = {
    data: ISidebarProps;
    errors: Partial<{ [field in keyof ISidebarProps]: string }>;
    fnOnChange: (field: keyof ISidebarProps, value: any) => void;
    fnReset: () => void;
    fnParcialReset: (field: keyof ISidebarProps) => void;
};

export const sidebarStore = create<Store>((set, get) => ({
    data: { ...stateDefault },
    errors: {},
    fnOnChange: (field, value) => {
        set((state) => {
            const newData = { ...state.data, [field]: value };
            return { data: newData };
        });
    },
    fnReset: () => {
        set(() => {
            return { data: stateDefault };
        });
    },
    fnParcialReset: (field) => {
        set((prevState) => ({
            ...prevState,
            data: { ...prevState.data, [field]: stateDefault[field] }
        }));
    }
}));
