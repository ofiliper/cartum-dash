import { create } from 'zustand'

export interface IPlans {
    isFetching: boolean;
    list: {
        id: number,
        name: string,
        value: string,
        price: number,
        description: string,
        credits: number,
        position: number
    }[]
}

const stateDefault: IPlans = {
    isFetching: true,
    list: []
}

type Store = {
    data: IPlans
    fnOnChange: (field: keyof IPlans, value: any) => void
    fnReset: () => void
}

const planStore = create<Store>((set) => ({
    data: { ...stateDefault },
    fnOnChange: async (field, value) => {
        set((state) => {
            const newData = { ...state.data, [field]: value }
            return { data: newData }
        })
    },
    fnReset: () => {
        set(() => {
            return { data: stateDefault }
        })
    }
}))

export { planStore };