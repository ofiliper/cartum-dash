

import { Cookies } from 'react-cookie'
import useSWR from 'swr'
import { useStore } from 'zustand'
import { sessionStore } from '../session/session-store'
import { fnFetch } from '@/utils/functions/fnFetch'
import { fnDecodeToken } from '@/utils/functions/fnDecodeToken'

export const useStatsData = () => {

    const cookies = new Cookies();
    const session = useStore(sessionStore);
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }

    const fnFetchStats = async () => {

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stats`,
                method: 'GET',
                headers: _headers
            })

            if (_result?.ok) {


            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnFetchStatsFavorite = async (id_story: number) => {


        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stats/favorite`,
                method: 'POST',
            })

            if (_result?.ok) {



            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnFetchStatsRate = async (data: { email: string; password: string }) => {

        const { email, password } = data;
        const _obj = { email, password };

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stats/rate-story`,
                method: 'POST',
                body: _obj
            })

            if (_result?.ok) {


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
        fnFetchStats,
        fnFetchStatsRate,
        fnFetchStatsFavorite,
    }
    
}