import useSWR from 'swr'
import { useStore } from 'zustand'

import { Cookies } from 'react-cookie'
import { toast } from 'react-toastify'
import { fnFetch } from '@/utils/functions/fnFetch'
import { planStore } from './plan-store'

const usePlanData = () => {

    const cookies = new Cookies();
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }
    const plans = useStore(planStore);

    const fnGetPlans = async (slug?: string) => {

        try {
            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/plans`,
                // headers: _headers,
            })
            if (_result.ok) {
                const _response = await _result
                plans.fnOnChange("isFetching", false);
                plans.fnOnChange("list", _response.data);
            } else {

            }
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const { data, error, mutate } = useSWR('appearance-data', null, {
        revalidateOnMount: false,
        initialData: undefined,
        revalidateOnFocus: false,
    })

    return {
        data,
        error,
        mutate,
        fnGetPlans
    }
}

export default usePlanData