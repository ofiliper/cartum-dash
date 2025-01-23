import { useState } from "react";
import "./accordeon-style.css";
import { BiChevronDown } from "react-icons/bi";

interface IQuestion {
    title: string;
    content: string;
}
export default function Accordeon({ questions, defaultQuestion = -1 }: { questions: IQuestion[], defaultQuestion?: number }) {

    const [questionActive, setQuestionActive] = useState(defaultQuestion);

    return (
        <div className="max-w-lg mx-auto mt-10">
            {
                questions.length > 0 &&
                questions.map((item, index) => (
                    <div
                        key={index}
                        className={`relative bg-white container-rounded-top ${!(questionActive === index) ? 'bg-transparent' : ''} overflow-hidden`}
                    >
                        <div
                            className={`relative py-4 px-7 flex justify-between items-center cursor-pointer custom-rounded-top ${questionActive === index ? 'bg-[#490d59] text-white ' : 'bg-[#faf6f0] text-black'}`}
                            onClick={() => setQuestionActive(index)}
                        >
                            <h3 className="text-lg font-bold">
                                {item.title}
                            </h3>
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full bg-red-500 transition-transform -rotate-90 ${questionActive === index ? "rotate-0 !bg-[#e8063c] " : ""
                                    }`}
                            >
                                <span className={`text-4xl ${questionActive === index ? 'text-white' : 'text-black'}`}><BiChevronDown /></span>
                            </div>
                        </div>

                        {/* Conteúdo */}
                        {questionActive === index && (
                            <div className="p-4 text-gray-700">
                                <p>
                                    {item.content}
                                </p>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    )
}