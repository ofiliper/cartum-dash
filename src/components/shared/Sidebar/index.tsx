'use client'

import { useStore } from "zustand"
import { twMerge } from "tailwind-merge";
import { BiLogOut } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { sidebarStore } from "@/store/sidebar/sidebar-store";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const sidebar = useStore(sidebarStore);
    const { menu } = sidebar.data;

    const pathname = usePathname()
    console.log(pathname)

    return (
        <div className="bg-white h-[93vh]">
            <div className="flex flex-col h-[100%] gap-1 py-2 pt-10 px-5">
                {
                    menu.map((item: any, index: number) => {
                        return (
                            <a
                                key={index}
                                href={item.path}
                                className={twMerge(
                                    "flex items-center gap-2 py-4 px-5 mx-2 rounded-xl hover:bg-stone-200 transition-all linear-ease bg-white relative hover:menu-active hover:!bg-slate-100",
                                    pathname === item.path && "menu-active !bg-[#854795] hover:!bg-purple-800 !text-white"
                                )}>
                                <span className="text-lg">{<item.icon />}</span>
                                <span className="text-sm font-bold">{item.title}</span>
                            </a>
                        )
                    })
                }
                <div className="flex justify-between items-center gap-1 text-xs mt-auto pt-3 pb-1 px-5 border-t border-stone-200">
                    <button className="flex items-center gap-1">
                        <BiLogOut />
                        <span>Desconectar</span>
                    </button>
                    <button className="flex items-center gap-1">
                        <BsQuestionCircle />
                    </button>
                </div>
            </div>
        </div>
    )
}