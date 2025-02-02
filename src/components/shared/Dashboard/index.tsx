import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import "./dashboard-container-style.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({ children }: { children: React.ReactElement }) {
    return (
        <>
            <ToastContainer />
            <div className="h-screen overflow-hidden">
                <Topbar />
                <div className="sm:grid sm:grid-cols-[3fr_10fr] gap-4 h-[90vh] overflow-y-auto sm:overflow-hidden">

                    <Sidebar />
                    <div className="flex bg-slate-100 overflow-y-scroll">
                        {children}
                    </div>
                </div>
            </div >
        </>
    )
}