import Image from "next/image";
import './book-style.css';

export default function Pages({ ...props }) {
    return (
        <div {...props}  >
            <Image
                src="/images/page.svg"
                alt="Imagem de uma página"
                height="200"
                width="200"
                className="w-full"
            />
            <div className="page w-[680px] h-screen bg-[#FFF2DE]" />
        </div>
    )
}