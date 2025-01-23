'use client';

import Button from "@/components/shared/Button"
import Image from "next/image";

export default function Banner() {
    return (

        <div className="relative flex items-center justify-start h-[720px]">

            <Image
                src="/images/banner.png"
                alt="kids"
                width={1920}
                height={1080}
                className={`w-full object-cover h-[720px] rounded-b-[120px] absolute top-0 left-0`}
            />

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#000] to-transparent opacity-70 rounded-b-[120px]"></div>

            <div className="w-[790px] mt-40 z-[9] pl-40">
                <h1 className="text-[82px] leading-[82px] font-extrabold text-white mb-10">
                    Histórias criativas para você e seu filho
                </h1>
                <Button
                    onClick={() => { console.log("Cliquei") }}
                    label="Criar minha história agora" />
            </div>
        </div>
    )
}