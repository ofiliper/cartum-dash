'use client'

import { sessionStore } from "@/store/session/session-store";
import Image from "next/image";
import { useStore } from "zustand";
import TopbarUserMenu from "./TopbarUserMenu";
import { BsPlus } from "react-icons/bs";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { fnDecodeToken } from "@/utils/functions/fnDecodeToken";

export default function Topbar() {

    const session = useStore(sessionStore);
    const { credits } = session.data;
    const cookies = new Cookies();

    useEffect(() => {

        const { credits, id } = fnDecodeToken(cookies.get('userid'));
        if (!id) {
            cookies.remove("userid", { path: '/' })
        }
        session.fnOnChange("credits", credits)

    }, [])

    return (
        <div className="flex items-center justify-between bg-white border-b border-stone-300 py-2 px-5 h-[7vh]">
            <div>
                <a href="/dashboard">
                    <img
                        src="/images/cartum.png"
                        alt=""
                        width={140}
                        height={40}
                        className="w-[140px]" />
                </a>
            </div>
            <div className="flex items-center gap-5 text-lg">

                <a href="/dashboard/criar"
                    className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white">
                        <BsPlus />
                    </span>
                    <span className="text-sm font-bold">
                        Criar história
                    </span>
                </a>

                <a href="/dashboard/saldo" className="border-2 border-slate-100 rounded-full pointer flex items-center gap-2 px-4 py-2">
                    <Image
                        src="/images/coin.png"
                        alt=""
                        width={200}
                        height={200}
                        className="!w-[20px] !h-[20px] rounded-full" />
                    <span className="text-sm font-extrabold">
                        {credits} {credits > 1 ? ' Créditos' : ' Crédito'}
                    </span>
                </a>

                <TopbarUserMenu />
            </div>
        </div>
    )
}