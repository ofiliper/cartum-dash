'use client'

import 'react-h5-audio-player/lib/styles.css';
import { useStoriesData } from "@/store/stories/StoriesData";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { singleStoryStore } from '@/store/stories/single-story-store';
import { useStore } from 'zustand';
import Loader from '@/components/shared/Loader';
import StorySingle from '@/components/shared/StorySingle';
import { useCommunityData } from '@/store/community/CommunityData';

export default function StorySingleCommunityPage() {

    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split('/').pop();

    const communityHook = useCommunityData();
    const singleStory = useStore(singleStoryStore);

    useEffect(() => {

        if (typeof window !== 'undefined') {

            const hostname = window.location.hostname;
            const parts = hostname.split('.');

            console.log(id)
            if (parts) {
                communityHook.fnFetchSingleCommunityStory(String(id))
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

    if (singleStory.data.isFetching) return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Loader className='border-blue-400' />
        </div>)

    return (
        <StorySingle />
    )
}