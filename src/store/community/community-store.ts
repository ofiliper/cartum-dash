
import { BiBook, BiDollarCircle } from 'react-icons/bi';
import { BsBrush, BsFillGearFill, BsFillPeopleFill } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import { create } from 'zustand';


export interface IStories {
    isFetching: boolean;
    list: {
        id: string,
        image: string,
        title: string,
        excerpt: string,
        content: string,
        audio: string,
        shared: boolean,
        gender: string,
        views: number,
        stars: number,
        isFavorite: boolean
    }[]
}

const stateDefault: IStories = {
    isFetching: true,
    list: []
};

// ** Store ** //
type Store = {
    data: IStories;
    errors: Partial<{ [field in keyof IStories]: string }>;
    fnOnChange: (field: keyof IStories, value: any) => void;
    fnReset: () => void;
    fnParcialReset: (field: keyof IStories) => void;
};

export const communityStoriesStore = create<Store>((set, get) => ({
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
