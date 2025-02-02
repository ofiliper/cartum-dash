import { actionStore } from "@/store/action/action-store";
import { useStore } from "zustand";

export default function ModalContainer({ children, onClick }: { children: React.ReactElement, onClick?: () => void }) {
    const action = useStore(actionStore);
    const { modalIsOpen } = action.data;

    return (
        <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('modal-container')) {
                    onClick && (onClick())
                }
            }}
            className={`modal-container h-screen w-full bg-[#1c24347d] fixed top-0 left-0 z-[99] flex justify-center items-center 
          ${modalIsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
            {children}
        </div>
    )
}