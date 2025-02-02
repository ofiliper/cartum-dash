

import { Cookies } from 'react-cookie'
import useSWR from 'swr'
import { useStore } from 'zustand'
import { sessionStore } from '../session/session-store'
import { fnFetch } from '@/utils/functions/fnFetch'
import { fnDecodeToken } from '@/utils/functions/fnDecodeToken'
import { communityStoriesStore } from './community-store'
import { singleStoryStore } from '../stories/single-story-store'

export const useCommunityData = () => {

    const cookies = new Cookies();

    const communityStories = useStore(communityStoriesStore);
    const singleStory = useStore(singleStoryStore);
    const _headers = { Authorization: `Bearer ${cookies.get("userid")}` }

    const fnFetchAllCommunityStories = async () => {
        communityStories.fnOnChange("isFetching", true);
        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/community/stories`,
                method: 'GET',
                headers: _headers
            })

            if (_result?.ok) {
                communityStories.fnOnChange("list", _result.data);
                communityStories.fnOnChange("isFetching", false);
            } else {

                throw new Error("Usuário inválido")

            }

            return _result
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const fnFetchSingleCommunityStory = async (id_story: string) => {


        try {

            let _result = await fnFetch({
                url: `${process.env.NEXT_PUBLIC_API_URL}/community/${id_story}`,
                method: 'GET',
                headers: _headers
            })

            if (_result?.ok) {

                singleStory.fnOnChange("id", _result.data.id)
                singleStory.fnOnChange("content", _result.data.content)
                singleStory.fnOnChange("title", _result.data.title)
                singleStory.fnOnChange("views", _result.data.views)
                singleStory.fnOnChange("image", `${process.env.NEXT_PUBLIC_API_URL}/upload/${_result.data.id}/${_result.data.image}`)
                singleStory.fnOnChange("audio", `${process.env.NEXT_PUBLIC_API_URL}/upload/${_result.data.id}/${_result.data.audio}`)
                singleStory.fnOnChange("isFetching", false)
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
        fnFetchAllCommunityStories,
        fnFetchSingleCommunityStory
    }
}