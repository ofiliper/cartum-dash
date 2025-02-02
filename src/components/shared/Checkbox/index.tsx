import { useEffect, useState } from "react"

export default function Checkbox({ label, onClick, checked, fontSize = '' }: {
    label?: string;
    onClick?: (value: any) => void;
    checked: boolean;
    fontSize?: string
}) {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    return (
        <div onClick={() => {
            setIsChecked(!isChecked)
            onClick && (onClick(!isChecked))
        }} className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 flex items-center justify-center bg-black/10 rounded-sm overflow-hidden relative">
                <span
                    className={`block absolute bg-green-400 rounded-sm shadow-md transition-all duration-300 ease-in-out ${isChecked ? 'w-5 h-5' : 'h-0 w-0'}`}
                />
            </div>
            {label && (<div className={`font-medium text-sm ${fontSize}`}>{label}</div>)}
        </div >
    )
}