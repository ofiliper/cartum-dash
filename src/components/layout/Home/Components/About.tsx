'use client';
import Button from "@/components/shared/Button";
import { aboutData } from "./data/about-data";
import Accordeon from "@/components/shared/Accordeon";
import { questionsData } from "./data/questions-data";

export default function About() {



    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center px-10 gap-30 mx-auto w-[1280px]">

                    <div className="md:w-2/5 mb-6 md:mb-0">
                        <h2 className="text-5xl font-bold mb-4">
                            Crie histórias únicas e divertidas
                        </h2>
                        <p className="text-[#767a72] text-xl pt-7 pb-10">
                            Inclua-se na história, descreva-se com detalhes especiais. Assim
                            sua história será ainda mais personalizada!
                        </p>
                        <Button
                            onClick={() => { console.log("Cliquei") }}
                            label="Criar minha história agora" />
                    </div>

                    <div className="md:w-1/2">
                        <img
                            src="/images/family.png"
                            alt="Família"
                            className="rounded"
                        />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12 w-8/12 mx-auto py-20">
                    {
                        aboutData.map((item, index) => (
                            <div key={index}>
                                <img
                                    src={item.image}
                                    alt="Personalize"
                                    className="mx-auto mb-4 w-[60px]"
                                />
                                <h3 className="text-xl font-semibold text-2xl">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        ))
                    }
                </div>


                <div className="flex flex-col md:flex-row items-center px-10 gap-30 mx-auto w-[1280px]">

                    <div className="md:w-1/2">
                        <img
                            src="/images/family.png"
                            alt="Família"
                            className="rounded"
                        />
                    </div>

                    <div className="md:w-2/5 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold mb-4 text-center">
                            Talvez você se pergunte...
                        </h2>
                        <Accordeon questions={questionsData} defaultQuestion={0} />
                    </div>

                </div>

            </div>
        </section>
    )
}