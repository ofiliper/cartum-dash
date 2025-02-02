import { ChangeEvent, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Input(
    { label, desc, value, onChange, type = 'text', ...props }:
        { label: string, desc?: string; value: string, onChange?: (e: ChangeEvent<HTMLInputElement>) => void, type?: string }) {

    const [inputType, setType] = useState<string>(type);

    return (
        <div className="flex flex-col mb-2 w-full">
            <label className="font-bold">
                {label}
            </label>
            {desc && (<p className="text-sm mb-3">{desc}</p>)}
            <div className="w-full py-2 px-3 rounded-lg border border-slate-300 flex justify-between items-center gap-3 bg-white">
                <input
                    value={value}
                    onChange={(e) => onChange && onChange(e)}
                    type={inputType}
                    className="focus:outline-none w-full bg-transparent"
                />
                {
                    type === 'password' && (
                        <>
                            {
                                inputType === 'password'
                                    ? <button
                                        onClick={() => {
                                            setType('text');
                                        }}><BsEye /></button>
                                    : <button
                                        onClick={() => {
                                            setType('password');
                                        }}><BsEyeSlash /></button>
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}