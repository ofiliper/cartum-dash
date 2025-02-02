import { useEffect, useState } from "react";

const Switcher = (
    {
        value,
        onChange,
    }: {
        value: boolean;
        onChange: () => void
    }
) => {

    const [enabled, setEnabled] = useState<boolean>(value);

    useEffect(() => {
        setEnabled(value);
    }, [value])

    return (
        <div>
            <label
                className="flex cursor-pointer select-none items-center"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id="toggle1"
                        className="sr-only"
                        onChange={() => {
                            onChange && onChange();
                        }}
                    />
                    <div className={`block h-6 w-10 rounded-full bg-meta-9 dark:bg-[#5A616B] ${enabled && '!bg-emerald-400'}`} />
                    <div
                        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${enabled && "!shadow-4xl !right-1 !translate-x-full dark:!bg-white"
                            }`}
                    ></div>
                </div>
            </label>
        </div>
    );
};

export default Switcher;
