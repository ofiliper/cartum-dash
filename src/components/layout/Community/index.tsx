import Dashboard from "@/components/shared/Dashboard";
import StoryCard from "@/components/shared/StoryCard";

export default function Community() {
    return (
        <Dashboard>
            <div className="px-4 py-4">
                <div className="grid grid-cols-4 gap-4">
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <StoryCard
                                key={index}
                                title="Título do Card Título do Card Título do Card Título do Card"
                                desc="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessaryDescrição do Card"
                            />
                        ))
                    }
                </div>
            </div>
        </Dashboard>
    )
}