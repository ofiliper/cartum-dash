import Image from "next/image";
import { BiBell, BiChevronDown } from "react-icons/bi";

export default function Topbar() {
    return (
        <div className="flex items-center justify-between bg-white border-b border-stone-300 py-2 px-5 h-[7vh]">
            <div>
                <a href="/dashboard">
                    <img
                        src="/images/cartum.png"
                        alt=""
                        quality={100}
                        width={200}
                        height={200}
                        className="w-[140px]" />
                </a>
            </div>
            <div className="flex items-center gap-5 text-lg">

                <button className="bg-white p-3 hover:bg-slate-100 rounded-md transition-all linear-ease border border-transparent hover:border-slate-100 pointer">
                    <BiBell />
                </button>

                <button className="border-2 border-slate-100 rounded-full pointer flex items-center gap-2 px-4 py-2">
                    <Image
                        src="/images/coin.png"
                        alt=""
                        width={200}
                        height={200}
                        className="!w-[20px] !h-[20px] rounded-full" />
                    <span className="text-sm font-extrabold">
                        3 créditos
                    </span>
                </button>

                <div className="flex items-center gap-1 text-xs font-bold">
                    <span>Minha conta</span>
                    <BiChevronDown />
                </div>

            </div>
        </div>
    )
}