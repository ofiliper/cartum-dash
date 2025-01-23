import Image from "next/image";
import { BiUser } from "react-icons/bi";

export default function Header() {
    return (
        <header className="text-white py-8 absolute w-full z-[999]">
            <nav className="flex items-center justify-between items-center mb-6 w-[1140px] mx-auto bg-white rounded-full px-10 py-4">
                <div className="text-3xl font-bold text-black">
                    <a href="/" className="!w-[165px]">
                        <Image
                            src="/images/cartum.png"
                            alt="kids"
                            width={1920}
                            height={1080}
                            className={`!w-[165px]`}
                        />
                    </a>
                </div>
                <ul className="flex items-center space-x-6 text-md text-black font-bold">
                    <li><a href="#" className="">Sobre</a></li>
                    {/* <li><a href="#" className="">Contato</a></li> */}
                    <li><a href="#" className="">Termos de uso</a></li>
                    <li className="text-yellow-400 flex items-center gap-2">
                        <Image src="/images/coin.png" width={20} height={20} alt="flag" />
                        20 créditos
                    </li>
                    <li>
                        <button className="bg-white text-white px-4 py-2 rounded flex items-center space-x-2 !bg-rose-600 rounded-full">
                            <BiUser />
                            <span>Minha conta</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}