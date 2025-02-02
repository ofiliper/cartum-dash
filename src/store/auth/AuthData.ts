

import { Cookies } from 'react-cookie'
import useSWR from 'swr'
import { useStore } from 'zustand'
import { sessionStore } from '../session/session-store'
import { fnFetch } from '@/utils/functions/fnFetch'
import { fnDecodeToken } from '@/utils/functions/fnDecodeToken'

export const useAuthData = () => {

    const cookies = new Cookies();
    const session = useStore(sessionStore);
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }
    const website_url = process.env.NEXT_PUBLIC_API_URL;

    const fnFetchLogin = async (data: { email: string; password: string }) => {

        const { email, password } = data;
        const _obj = { email, password };

        try {

            let _result = await fnFetch({
                url: `${website_url}/auth/login`,
                method: 'POST',
                body: _obj
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

    const fnFetchValidator = async () => {
        try {
            let _result = await fnFetch({
                url: `${website_url}/auth/validator`,
                method: 'POST',
                headers: _headers
            })


            if (_result?.ok) {

                console.log(_result)

            } else {

                throw new Error("Usuário inválido")
            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnResetPassword = async (data: { email: string; token: string; password: string }) => {

        const { email, token, password } = data;
        const _obj = { email, token, password };

        try {

            let _result = await fnFetch({
                url: `${website_url}/auth/reset-pass`,
                method: 'POST',
                body: _obj
            })

            if (_result?.ok) {

                console.log(_result)
                // const { auth, token, user } = _result
                // cookies.set('userid', token, { path: '/' });

            } else {

                throw new Error(_result[0])

            }

            return _result;

        } catch (error) {
            throw error
        }
    }

    const fnFetchForgot = async (data: { email: string; }) => {

        const { email } = data;
        const _obj = { email };

        try {

            let _result = await fnFetch({
                url: `${website_url}/auth/recover-pass`,
                method: 'POST',
                body: _obj
            })

            if (_result?.ok) {

                console.log(_result)
                // const { auth, token, user } = _result
                // cookies.set('userid', token, { path: '/' });

            } else {

                throw new Error(_result[0])

            }

            return _result;

        } catch (error) {
            console.log(error)
            throw error
        }
    }



    const fnFetchRegister = async (data: { email: string; password: string; name: string; phone: string; }) => {

        const { email, password, name, phone } = data;
        const _obj = { email, password, name, phone }

        try {

            let _result = await fnFetch({
                url: `${website_url}/auth/signup`,
                method: 'POST',
                body: _obj
            })

            if (_result?.ok) {

                return _result.data;

            } else {

                throw new Error(_result[0])

            }

            return _result;

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
        fnFetchLogin,
        fnFetchValidator,
        fnFetchRegister,
        fnFetchForgot,
        fnResetPassword
        // fnFetchCompany,
    }
}