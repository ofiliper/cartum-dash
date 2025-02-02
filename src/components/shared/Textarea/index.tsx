import { ChangeEvent, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Textarea(
    { label, desc, value, onChange, type = 'text', maxLength, placeholder }:
        { label: string, desc?: string; placeholder?: string; value: string, onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void, type?: string; maxLength?: number; }) {

    const [inputType, setType] = useState<string>(type);

    return (
        <div className="flex flex-col mb-2 w-full">
            <label className="font-bold">
                {label}
            </label>
            {desc && (<p className="text-sm mb-3">{desc}</p>)}
            <div className="w-full py-2 px-3 rounded-lg border border-slate-300 flex justify-between items-center gap-3 bg-white">
                <textarea
                    value={value}
                    onChange={(e) => onChange && onChange(e)}
                    className="focus:outline-none w-full bg-transparent h-[120px] sm:h-auto w-full"
                    placeholder={placeholder}

                />
            </div>
            {
                value && maxLength && (<div className="text-[10px] text-slate-500 font-bold ml-3 flex justify-start">{value?.length}/{maxLength} caracteres</div>)
            }
        </div>
    )
}