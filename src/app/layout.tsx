"use client";

import React, { useEffect, useState } from "react";

import "../assets/css/satoshi.css"
import "../assets/css/style.css"
import Auth from "@/components/shared/Auth";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        <html lang="pt-br" >
            <body>
                <div className="dark:bg-boxdark-2 dark:text-bodydark" >
                    {children}
                </div>
            </body>
        </html>
    );
};