import { BsEye, BsStarFill } from "react-icons/bs";

export default function StoryCard({ id, image, title, desc, stars, views }: { id: string, image: string, title: string; desc: string, stars?: number, views?: number }) {
    return (
        <div className="shadow hover:shadow-md hover:scale-105 transition duration-300 ease-in-out rounded-xl cursor-pointer bg-white">
            <div
                style={{
                    backgroundImage: `linear-gradient(0deg, #00000070, transparent), url(${process.env.NEXT_PUBLIC_API_URL}/upload/${id}/${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                className="relative h-[240px] w-full rounded-t-xl">

                <div className="absolute top-2 right-2 flex gap-2">
                    {
                        views && (
                            <div className="flex items-center gap-1 bg-white rounded-xl px-3">
                                <BsEye />
                                <span className="text-[10px]">{views}</span>
                            </div>
                        )
                    }
                    {
                        stars && (
                            <div className="flex items-center gap-1 bg-white rounded-xl px-3">
                                <BsStarFill className="text-yellow-500" />
                                <span className="text-[10px]">4/5</span>
                            </div>
                        )
                    }
                </div>

                <h3 className="absolute bottom-2 left-2 text-white font-bold">{title?.length > 60 ? `${title.slice(0, 60)}...` : title}</h3>

            </div>

            <div className="px-4 pt-4 pb-10 rounded-b-xl">
                <span className="text-xs text-slate-700 font-extrabold">Sinopse:</span>
                <p className="text-xs text-slate-500">{desc?.length > 75 ? `${desc.slice(0, 75)}...` : desc}</p>
            </div>

        </div>
    )
}

