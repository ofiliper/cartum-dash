import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#ffd600] text-white py-10">
            <div className="container mx-auto px-4 flex justify-center">
                <div className="bg-white px-4 py-2 rounded-full flex items-center space-x-2">
                    <Image
                        src="/images/cartum.png"
                        alt="kids"
                        width={1920}
                        height={1080}
                        className={`w-[165px]`}
                    />
                </div>
            </div>
        </footer>
    )
}