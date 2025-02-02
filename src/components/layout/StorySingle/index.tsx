'use client'

import 'react-h5-audio-player/lib/styles.css';
import { useStoriesData } from "@/store/stories/StoriesData";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { singleStoryStore } from '@/store/stories/single-story-store';
import { useStore } from 'zustand';
import Loader from '@/components/shared/Loader';
import StorySingle from '@/components/shared/StorySingle';
import Switcher from '@/components/shared/Switcher';

export default function StorySinglePage() {

    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const storyHook = useStoriesData();

    const singleStory = useStore(singleStoryStore);


    useEffect(() => {

        if (typeof window !== 'undefined') {

            const hostname = window.location.hostname;
            const parts = hostname.split('.');

            console.log(id)
            if (parts) {
                storyHook.fnFetchSingleStory(String(id))
                    .then((data) => {
                        if (!data) return router.push("/dashboard")
                        singleStory.fnOnChange("isFetching", false)
                    })
                    .catch(() => router.push("/dashboard"))
            } else {
                router.push("/dashboard")
            }
        }

    }, []);

    const changeShareStoryStatus = () => {

        storyHook.fnFetchShareStory({
            id_story: singleStory.data.id,
            share: !singleStory.data.shared
        })
            .then(() => storyHook.fnFetchSingleStory(String(singleStory.data.id)))


    }

    if (singleStory.data.isFetching) return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Loader className='border-blue-400' />
        </div>)

    return (
        <StorySingle>
            <div className='mt-5 py-4 px-10 flex flex-col items-center justify-center border border-slate-200 bg-slate-50 rounded-md'>
                <h4 className='font-extrabold text-xl'>Que tal compartilhar essa história?</h4>
                <p className='sm:text-center text-sm py-3'>Você pode optar por compartilhar esta história. Assim, outras pessoas poderão ouvi-la, e você estará contribuindo para o aumento do nosso acervo.</p>
                <div className='flex items-center gap-2 justify-center'>
                    <span className='text-xl'>Compartilhar história com a comunidade</span>
                    <Switcher
                        value={singleStory.data.shared}
                        onChange={changeShareStoryStatus} />
                </div>
            </div>
        </StorySingle>
    )
}