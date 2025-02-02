

import { Cookies } from 'react-cookie'
import useSWR from 'swr'
import { useStore } from 'zustand'
import { sessionStore } from '../session/session-store'
import { fnFetch } from '@/utils/functions/fnFetch'
import { fnDecodeToken } from '@/utils/functions/fnDecodeToken'
import { storiesStore } from './stories-store'
import { createStoryStore } from './create-story-store'
import { singleStoryStore } from './single-story-store'

export const useStoriesData = () => {

    const cookies = new Cookies();
    const session = useStore(sessionStore);
    const stories = useStore(storiesStore);
    const singleStory = useStore(singleStoryStore);
    const createStory = useStore(createStoryStore);
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }

    const fnFetchAllStories = async () => {

        stories.fnOnChange("isFetching", true)

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stories/all`,
                method: 'GET',
                headers: _headers
            })

            if (_result?.ok) {

                stories.fnOnChange("list", _result.data);
                stories.fnOnChange("isFetching", false)

            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnFetchSingleStory = async (id_story: string) => {


        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stories/${id_story}`,
                method: 'GET',
                headers: _headers
            })

            if (_result?.ok) {

                singleStory.fnOnChange("id", _result.data.id)
                singleStory.fnOnChange("content", _result.data.content)
                singleStory.fnOnChange("shared", _result.data.shared)
                singleStory.fnOnChange("title", _result.data.title)
                singleStory.fnOnChange("image", `${process.env.NEXT_PUBLIC_API_URL}/upload/${_result.data.id}/${_result.data.image}`)
                singleStory.fnOnChange("audio", `${process.env.NEXT_PUBLIC_API_URL}/upload/${_result.data.id}/${_result.data.audio}`)
                return _result.data;


            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnFetchShareStory = async (data: { id_story: string, share: boolean }) => {

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stories/share`,
                method: 'PUT',
                headers: _headers,
                body: data
            })

            if (_result?.ok) {

                return _result.data;

            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    const fnFetchCreateStory = async () => {

        const { title,
            characters,
            challenges,
            gender,
            content } = createStory.data;

        const _obj = {
            title,
            characters,
            challenges,
            gender,
            content
        };

        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/stories`,
                method: 'POST',
                headers: _headers,
                body: _obj
            })

            if (_result?.ok) {

                return _result.data;

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
        fnFetchAllStories,
        fnFetchSingleStory,
        fnFetchShareStory,
        fnFetchCreateStory
        // fnFetchCompany,
    }
}