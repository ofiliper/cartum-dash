

import { Cookies } from 'react-cookie'
import useSWR from 'swr'
import { useStore } from 'zustand'
import { sessionStore } from '../session/session-store'
import { fnFetch } from '@/utils/functions/fnFetch'
import { paymentSessionStore } from './payment-store'

export const usePaymentData = () => {

    const cookies = new Cookies();
    const session = useStore(sessionStore);
    const payments = useStore(paymentSessionStore);
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }

    const fnFetchPix = async () => {

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/payments/generate-pix`,
                method: 'POST',
                headers: _headers,
                body: {
                    plan: payments.data.planName
                }
            })

            if (_result?.ok) {

                payments.fnOnChange('qrcode_image', _result.data?.qrCodeBase64)
                payments.fnOnChange('qrcode', _result.data?.qrCode)
                payments.fnOnChange('paymentId', _result.data?.paymentId)

            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnFetchPixConsult = async (id_pix: number) => {


        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/payments/consult-pix/${id_pix}`,
                method: 'GET',
                headers: _headers,
            })

            if (_result?.ok) {

                return _result;

            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }





    const { mutate } = useSWR('login-data', null, {
        revalidateOnMount: false,
        initialData: undefined,
        revalidateOnFocus: false
    })

    return {
        mutate,
        fnFetchPix,
        fnFetchPixConsult
    }

}