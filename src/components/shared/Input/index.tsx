export default function Input({ label, ...props }: { label: string }) {
    return (
        <div className="flex flex-col mb-2 w-full">
            <label className="font-bold">
                {label}
            </label>
            <input className={`w-full focus:outline-none py-2 px-3 rounded-lg border border-slate-300`} {...props} />
        </div>
    )
}