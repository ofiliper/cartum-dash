"use client";

import React, { useEffect, useState } from "react";

import "../assets/css/satoshi.css"
import "../assets/css/style.css"


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

            <head>

            </head>
            <body>
                <div className="dark:bg-boxdark-2 dark:text-bodydark" >
                    {children}
                </div>
            </body>
        </html>
    );
}
