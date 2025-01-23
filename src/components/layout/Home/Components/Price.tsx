'use client';
import Button from "@/components/shared/Button";
import Image from "next/image";

export default function Price() {
    return (
        <div>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center -mb-40 relative z-[9]">
                    <div className="w-4/12 mx-auto">
                        <h2 className="text-3xl font-bold mb-8">Valores</h2>
                        <p className="text-gray-600 mb-12">
                            Sua história ficará salva em sua biblioteca. Você poderá reler
                            sempre que desejar!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[1100px] mx-auto">
                        <div className="bg-gray-100 p-6 rounded shadow bg-white rounded-xl">
                            <h3 className="text-xl font-bold">Noviço</h3>
                            <p className="mt-2 text-gray-600">4 créditos</p>
                            <p className="text-3xl font-bold mt-4">R$ 9,90</p>
                            <Button label="Cadastrar agora" onClick={() => { }} />
                        </div>
                        <div className="bg-gray-100 p-6 rounded shadow bg-white rounded-xl">
                            <h3 className="text-xl font-bold">Aventureiro</h3>
                            <p className="mt-2 text-gray-600">15 créditos</p>
                            <p className="text-3xl font-bold mt-4">R$ 29,90</p>
                            <Button label="Cadastrar agora" onClick={() => { }} />
                        </div>
                        <div className="bg-gray-100 p-6 rounded shadow bg-white rounded-xl">
                            <h3 className="text-xl font-bold">Odisseia</h3>
                            <p className="mt-2 text-gray-600">30 créditos</p>
                            <p className="text-3xl font-bold mt-4">R$ 54,90</p>
                            <Button label="Cadastrar agora" onClick={() => { }} />
                        </div>
                    </div>
                </div>
            </section>
            <Image
                src="/images/kids.png"
                alt="kids"
                width={1920}
                height={1080}
                className={`w-full object-cover h-[720px] rounded-t-[120px]`}
            />
        </div>
    )
}