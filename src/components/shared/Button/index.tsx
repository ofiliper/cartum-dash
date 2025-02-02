import Loader from "../Loader"

export default function Button({ label, onClick, className = '', isLoading, isDisabled }:
    { label: string, onClick: () => void, className?: string, isLoading?: boolean, isDisabled?: boolean }) {
    return (
        <div className={`${isDisabled ? 'opacity-60' : ''}`}>
            {isLoading
                ? <button
                    className={`relative bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex justify-center opacity-50 ${className}`}>
                    <Loader className="border-white w-6 h-6" />
                </button>
                : <button
                    onClick={() => { onClick && onClick() }}
                    className={`relative bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 overflow-hidden ${className}`}>
                    <span className="absolute inset-0 bg-gradient-to-b from-white/90 to-transparent opacity-60 rounded-full m-[4px]"></span>
                    <span className="relative text-shadow font-bold">{label}</span>
                </button>
            }
        </div>
    )
}