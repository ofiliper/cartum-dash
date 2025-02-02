'use client'

import Dashboard from "@/components/shared/Dashboard";
import Skeleton from "@/components/shared/Skeleton";
import StoryCard from "@/components/shared/StoryCard";
import { storiesStore } from "@/store/stories/stories-store";
import { useStoriesData } from "@/store/stories/StoriesData";
import { useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { useStore } from "zustand";

export default function Library() {

    const storiesHook = useStoriesData();
    const stories = useStore(storiesStore);
    const { list, isFetching } = stories.data;

    useEffect(() => {
        storiesHook.fnFetchAllStories();
    }, [])


    return (
        <Dashboard>
            <div className="px-4 py-4 w-full">
                {
                    isFetching
                        ? <Skeleton className="h-[320px] !w-[320px] shadow" />
                        : <div className="flex flex-col sm:grid sm:grid-cols-4 gap-4 w-full">
                            <a
                                href="/dashboard/criar"
                                className="shadow hover:shadow-md hover:scale-105 transition duration-300 ease-in-out rounded-xl cursor-pointer flex items-center justify-center py-10 sm:py-0">
                                <div className="flex flex-col items-center">
                                    <div className="flex justify-center items-center rounded-full h-10 w-10 border border-slate-600 text-5xl text-slate-400 border-slate-400">
                                        <BiPlus />
                                    </div>
                                    <h4 className="font-bold mt-4 text-slate-400">
                                        Criar nova história
                                    </h4>
                                </div>
                            </a>
                            {
                                list && list.map((_, index) => (
                                    <a
                                        key={index}
                                        href={`/dashboard/${_.id}`}
                                    >
                                        <StoryCard
                                            key={index}
                                            id={_.id}
                                            title={_.title}
                                            image={_.image}
                                            desc={_.excerpt}
                                        />
                                    </a>
                                ))
                            }
                        </div>
                }
            </div>
        </Dashboard>
    )
}