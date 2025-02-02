import { BiX } from "react-icons/bi";
import TermosDeUso from "../../Termos/Termos";
import { useStore } from "zustand";
import { actionStore } from "@/store/action/action-store";

export default function Terms() {
    const action = useStore(actionStore);
    return (
        <div className="bg-white w-[700px] h-[400px] rounded-md">
            <div className="flex items-center justify-between px-6 pt-4">
                <h4 className="text-xl font-bold">Nossos termos de uso:</h4>
                <button onClick={() => action.fnOnChange("modalIsOpen", false)}>
                    <BiX />
                </button>
            </div>
            <div className="p-4">
                <div className="w-full h-[300px] overflow-y-scroll bg-slate-100 rounded-xl">
                    <TermosDeUso />
                </div>
            </div>
        </div>
    )
}