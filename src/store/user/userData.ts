

import { Cookies } from 'react-cookie'
import useSWR from 'swr'
import { useStore } from 'zustand'
import { sessionStore } from '../session/session-store'
import { fnFetch } from '@/utils/functions/fnFetch'
import { fnDecodeToken } from '@/utils/functions/fnDecodeToken'

export const useUserData = () => {

    const cookies = new Cookies();
    const session = useStore(sessionStore);
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }

    const fnFetchUser = async () => {

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
                method: 'GET',
                headers: _headers
            })

            if (_result?.ok) {

                const { token } = _result.data;
                const { credits, id } = fnDecodeToken(token);

                cookies.set('userid', token, { path: '/' });
                session.fnOnChange("credits", credits)

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
        fnFetchUser
    }
}