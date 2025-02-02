'use client'

import { useEffect, useRef, useState } from "react";
import selectFieldStyle from "./select-field-style";

import { IoMdArrowDropdown } from "react-icons/io";

// import ButtonField from "../ButtonField/ButtonField";
// import CopyIcon from "@/assets/icons/CopyIcon";
// import selectFieldStyle from "./select-field";



interface IOptions {
    id: number | string;
    label: string;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
}

interface ISelectField {
    label?: string;
    desc?: string;
    placeholder?: string;
    options?: IOptions[];
    value?: any;
    className?: string;
    onClick?: (item: any) => void;
    width?: string;
    isLoading?: boolean;
}

export default function Select({
    label,
    desc,
    placeholder = "Selecione...",
    options,
    value,
    onClick,
    className,
    width = '',
    isLoading = false
}: ISelectField) {

    const [active, setActive] = useState<boolean>(false);
    const [placeholderText, setPlaceholder] = useState<string>(placeholder);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOption = (item: { id: number | string, label: string }, index: number) => {
        setPlaceholder(item.label);
        onClick && onClick(item);
        setActive(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {

        if (value) {
            if (!options || options.length === 0) return;
            const findOption = options.find((item) => item.id === value);
            if (findOption) {
                setPlaceholder(findOption.label || placeholder);
            } else {
                setPlaceholder(placeholder);
            }
            return
        } else {
            setPlaceholder(placeholder);
        }

    }, [options, value]);


    return (
        <div ref={selectRef} className={`flex flex-col mb-2 w-full ${width}`}>

            {label && (
                <label className="font-bold">
                    {label}
                </label>
            )}

            {desc && (<p className="text-sm mb-3">{desc}</p>)}

            <button
                className={`border border-slate-300 bg-transparent px-3 sm:px-4 py-3 sm:py-3 rounded-md w-full text-left flex justify-between items-center text-xs sm:text-sm bg-white ${className}`}
                onClick={e => setActive(!active)}>

                <span> {placeholderText}</span>
                <IoMdArrowDropdown />

            </button>

            <div className="relative">
                {
                    options && (
                        <div className={`${selectFieldStyle.options(active, options.length)} bg-white !z-9 py-1 shadow-xl`}>
                            {
                                options &&
                                options.map((item: IOptions, i: number) => {
                                    return (
                                        <div key={i} className="box-border">
                                            <button
                                                key={i}
                                                onClick={() => handleOption(item, i)}
                                                className={`block w-full box-border text-left px-3 py-2 rounded-md bg-gradient-to-t from-bg-[#F4F7F7] to-bg-transparent border border-[#F4F7F7] hover:bg-stone-100 !box-border text-sm sm:text-sm ${className}`}
                                            >
                                                {item.label || ''}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>

    )
}