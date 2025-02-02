
import { create } from 'zustand'

export interface IPaymentProps {

    isFetching: boolean
    step: number
    planName?: string
    planId?: number

    qrcode_image: string
    qrcode: string
    paymentId?: number;
}

const stateDefault: IPaymentProps = {
    isFetching: false,
    step: 0,
    planName: '',
    qrcode_image: '',
    qrcode: ''

}

type Store = {
    data: IPaymentProps
    errors: Partial<{ [field in keyof IPaymentProps]: string }>
    fnOnChange: (field: keyof IPaymentProps, value: any) => void
    fnReset: () => void
    fnParcialReset: (field: keyof IPaymentProps) => void
}

export const paymentSessionStore = create<Store>((set, get) => ({
    data: { ...stateDefault },
    errors: {},
    fnOnChange: (field, value) => {
        set((prevState) => (
            {
                ...prevState,
                data: {
                    ...prevState.data,
                    [field]: value
                }
            }))
    },
    fnReset: () => {
        set((prevState) => (
            {
                ...prevState,
                data: { ...stateDefault }
            }))
    },
    fnParcialReset: (field) => {
        set((prevState) => {
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    [field]: stateDefault[field]
                }
            }
        }
        )
    }
}))