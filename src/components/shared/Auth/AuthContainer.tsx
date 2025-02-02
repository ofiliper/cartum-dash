export default function AuthContainer({ children }: { children: React.ReactElement }) {
    return (
        <div className="sm:h-screen w-full bg-white sm:bg-slate-200 flex items-center justify-center">
            {children}
        </div>
    )
}