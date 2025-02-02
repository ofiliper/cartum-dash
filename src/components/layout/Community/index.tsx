'use client';

import Dashboard from "@/components/shared/Dashboard";
import Skeleton from "@/components/shared/Skeleton";
import StoryCard from "@/components/shared/StoryCard";
import { communityStoriesStore } from "@/store/community/community-store";
import { useCommunityData } from "@/store/community/CommunityData";
import { useEffect } from "react";
import { useStore } from "zustand";

export default function Community() {

    const communityHook = useCommunityData();
    const communityStories = useStore(communityStoriesStore);
    const { list, isFetching } = communityStories.data;

    useEffect(() => {
        communityHook.fnFetchAllCommunityStories();
    }, [])

    return (
        <Dashboard>
            <div className="px-4 py-4 w-full">
                {
                    isFetching
                        ? <Skeleton className="h-[320px] !w-[320px] shadow" />
                        : list &&
                            list.length > 0
                            ? <div className="grid grid-cols-4 gap-4">


                                {
                                    list.map((_, index) => (
                                        <a
                                            key={index}
                                            href={`/dashboard/comunidade/${_.id}`}
                                        >
                                            <StoryCard
                                                id={_.id}
                                                title={_.title}
                                                image={_.image}
                                                desc={_.excerpt}
                                                stars={_.stars}
                                                views={_.views}
                                            />
                                        </a>
                                    ))
                                }
                            </div>
                            : <div className="h-screen w-full flex justify-center items-center">
                                <p>Ainda não há histórias na comunidade.</p>
                            </div>

                }
            </div>

        </Dashboard>
    )
}