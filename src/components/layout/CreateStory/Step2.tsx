import { useStoriesData } from "@/store/stories/StoriesData";
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import { toast } from "react-toastify";

export default function Step2() {

    const storyHook = useStoriesData();
    const router = useRouter();

    useEffect(() => {
        storyHook.fnFetchCreateStory()
            .then((data) => {
                router.push(`/dashboard/${data.id}`)
            })
            .catch(() => {
                toast.error("Não foi possível gerar a sua história.")
                router.push(`/dashboard/criar`)
            })
    }, []);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">

            <img
                src="/images/paper.png"
                alt="Papel"
                className="w-[200px] h-[200px] animate-pulse rotate-[-5deg]" />

            <h2 className="font-extrabold text-3xl animate-pulse">
                Sua história está sendo gerada
            </h2>

            <h4 className="text-xl">
                Por favor, aguarde...
            </h4>

        </div>
    )
}