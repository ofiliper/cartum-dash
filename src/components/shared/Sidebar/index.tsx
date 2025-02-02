'use client'

import { useStore } from "zustand"
import { twMerge } from "tailwind-merge";
import { sidebarStore } from "@/store/sidebar/sidebar-store";
import { usePathname } from "next/navigation";
import { actionStore } from "@/store/action/action-store";

export default function Sidebar() {

    const sidebar = useStore(sidebarStore);
    const action = useStore(actionStore);
    const { menu } = sidebar.data;
    const { menuIsOpen } = action.data;

    const pathname = usePathname()
    console.log(pathname)

    return (
        <div className={`z-[99] fixed sm:relative bg-white h-[93vh] transition-all linear-ease !left-[-900px] sm:!left-0 ${menuIsOpen ? ('!left-0') : ''}`}>
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
            </div>
        </div>
    )
}