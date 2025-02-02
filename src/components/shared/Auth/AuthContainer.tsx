export default function AuthContainer({ children }: { children: React.ReactElement }) {
    return (
        <div className="h-screen w-full bg-slate-200 flex items-center justify-center">
            {children}
        </div>
    )
}