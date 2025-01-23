import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import "./dashboard-container-style.css";

export default function Dashboard({ children }: { children: React.ReactElement }) {
    return (
        <div className="h-screen overflow-hidden">
            <Topbar />
            <div className="grid grid-cols-[3fr_10fr] gap-4">
                <Sidebar />
                <div className="flex bg-slate-100 h-screen overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div >
    )
}