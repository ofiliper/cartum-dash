'use client'

import AuthContainer from "@/components/shared/Auth/AuthContainer";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useAuthData } from "@/store/auth/AuthData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const authHook = useAuthData();
    const [user, setUser] = useState<{ email: string; password: string }>({ email: '', password: '' });
    const [alert, setAlert] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const signin = () => {
        if (!user.email && !user.password) return
        setIsLoading(true)
        authHook.fnFetchLogin({ email: user.email, password: user.password })
            .then(() => router.push("/dashboard"))
            .catch(() => setAlert({ show: true, message: 'Usuário inválido' }))
            .finally(() => setIsLoading(false))
    }

    return (
        <AuthContainer>
            <div className="bg-white w-full sm:w-[560px] rounded-lg py-10 px-7 sm:px-20">
                <div className="flex justify-center w-full mb-10">
                    <img
                        src="/images/cartum.png"
                        alt="Cartum.com.br"
                        height={50}
                        width={180}
                        className="w-[180px]"
                    />
                </div>
                <div className="flex flex-col gap-2">

                    <Input
                        label="Seu e-mail"
                        value={user.email}
                        onChange={(e) => {
                            setAlert({ ...alert, show: false });
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }}
                    />

                    <Input
                        value={user.password}
                        type="password"
                        label="Sua senha"
                        onChange={(e) => {
                            setAlert({ ...alert, show: false });
                            setUser({
                                ...user,
                                password: e.target.value
                            })
                        }}
                    />

                    <div className="flex justify-start text-sm mb-2">
                        <a href="/auth/esqueci">Esqueceu a senha?</a>
                    </div>

                    {
                        alert.show && (
                            <div className="border border-rose-500 bg-rose-100 py-2 px-4 rounded-md text-rose-700">
                                {alert.message}
                            </div>
                        )
                    }

                    <div className="flex justify-center">
                        <Button
                            label="Conectar agora"
                            isLoading={isLoading}
                            onClick={signin}
                        />
                    </div>
                </div>

                <div className="py-6 text-center text-lg">
                    Ainda não tem uma conta?
                    <a href="/auth/cadastrar">
                        <b className="text-violet-800 ml-2">Cadastre-se</b>
                    </a>
                </div>

            </div>
        </AuthContainer>
    )
}