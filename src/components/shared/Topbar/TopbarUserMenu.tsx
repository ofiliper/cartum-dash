'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { BiLogOut, BiUser } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";


export default function TopbarUserMenu() {

    const [isActive, setIsActive] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);


    const cookies = new Cookies();
    const router = useRouter();

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <div ref={selectRef} className="relative !z-[997]">

            <button
                onClick={() => setIsActive(!isActive)}
                className="flex items-center gap-2">
                <span
                    className="text-md text-black transition-all duration-400 ease-in-out rounded-full w-30 h-10 flex items-center">
                    <IoMdArrowDropdown />
                    <span className="text-xs font-bold">Minha conta</span>
                </span>
            </button>

            <div className={`absolute bg-white rounded-xl w-60 right-0 !z-9 border border-black/5 shadow-xl transition-all duration-400 ${isActive ? 'mb-2 opacity-100 visible' : 'mb-0 opacity-0 invisible'}`}>
                <div className="px-2 pt-2">
                    <a
                        href={"/dashboard/meus-dados"}
                        className="block px-2 py-2 rounded-md border border-[#F4F7F7] hover:bg-stone-100"
                    >
                        <h4 className="font-medium flex gap-1 items-center text-sm">
                            <BiUser className="text-indigo-600 font-bold" />
                            Dados de cadastro
                        </h4>
                    </a>
                </div>
                <div className="px-2 pt-2 pb-2">
                    <button
                        onClick={async () => {
                            await cookies.remove("userid", { path: '/' })
                            router.push("/auth/login")
                        }}
                        className="block w-full px-2 py-2 rounded-md border border-[#F4F7F7] hover:bg-stone-100 relative"
                    >
                        <h4 className="font-medium flex gap-1 items-center text-sm">
                            <BiLogOut className="text-indigo-600 font-bold" />
                            Sair
                        </h4>
                    </button>
                </div>
            </div>

        </div>
    )
}