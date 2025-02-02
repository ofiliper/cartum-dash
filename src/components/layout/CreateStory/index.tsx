'use client'

import { useStore } from "zustand";
import Step1 from "./Step1";
import { createStoryStore } from "@/store/stories/create-story-store";
import Step2 from "./Step2";
import { useEffect } from "react";
import { useUserData } from "@/store/user/userData";


const CreateStory = () => {

    const story = useStore(createStoryStore);
    const { step } = story.data;
    const userHook = useUserData();

    useEffect(() => {
        userHook.fnFetchUser();
    }, [])

    return (
        <>
            {step === 0 && (<Step1 />)}
            {step === 1 && (<Step2 />)}
        </>
    );
};

export default CreateStory;
