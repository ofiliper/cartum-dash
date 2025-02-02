import Button from "@/components/shared/Button";
import { actionStore } from "@/store/action/action-store";
import { sessionStore } from "@/store/session/session-store";
import { createStoryStore } from "@/store/stories/create-story-store";
import { useStoriesData } from "@/store/stories/StoriesData";
import Image from "next/image";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { useStore } from "zustand";

export default function CreateStoryConfirm() {
    const action = useStore(actionStore);
    const session = useStore(sessionStore);
    const { credits } = session.data;
    const createStory = useStore(createStoryStore);
 

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const proccedToCreateStory = () => {

        if (credits <= 0) {
            action.fnOnChange("modalIsOpen", false)
            toast.error("Você não possui créditos")
        }
        setIsLoading(true)
        createStory.fnOnChange("step", 1)

    }
    return (
        <div className="bg-white w-[350px] h-[360px] rounded-md relative">
            <div className="flex items-center justify-end px-6 pt-4">
                <button
                    onClick={() => {
                        action.fnOnChange("modalIsOpen", false)
                    }}
                >
                    <BiX />
                </button>
            </div>

            <div className="flex flex-col h-[300px] p-4 items-center justify-around">
                <Image
                    src="/images/coin.png"
                    alt=""
                    width={200}
                    height={200}
                    className="!w-[90px] !h-[90px] rounded-full" />
                <h4 className="text-2xl text-center font-extrabold">Essa história custará<br /> 1 crédito do seu saldo</h4>
                <Button
                    label="Confirmar criação da história"
                    onClick={proccedToCreateStory}
                    isLoading={isLoading}
                />
            </div>

        </div >
    )
}