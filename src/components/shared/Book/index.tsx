import Input from "../Input";
import Pages from "./Pages";

export default function Book() {
    return (
        <div className="relative">
            <div className="border-l-6 border-rose-600 bg-rose-800 w-[720px] h-screen rounded-xl absolute top-[45px] right-0 animate-slide-in" />

            {
                Array.from({ length: 25 }).map((_, index, arr) => (
                    <Pages
                        key={index}
                        className="absolute animate-page-turn"
                        style={{
                            right: arr.length - (index + 4) * 1.4,
                            top: arr.length - (index + 4) * 1.2,
                            filter: `brightness(${0.5 + (index / arr.length) * 0.5})`,
                            animationDelay: `${index * 0.05}s`,
                        }}
                    />
                ))
            }

            <div className="w-[720px] h-screen top-[45px] -right-20 absolute  animate-fade-in flex flex-col gap-4 p-4">

                <Input
                    label="Título"
                    className="focus:outline-none bg-transparent border-b border-slate-500"
                />
                <Input
                    label="Gênero"
                    className="focus:outline-none bg-transparent border-b border-slate-500"
                />
                <Input
                    label="Tema"
                    className="focus:outline-none bg-transparent border-b border-slate-500"
                />

            </div>

        </div>
    )
}