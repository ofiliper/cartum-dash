'use client'

import AuthContainer from "@/components/shared/Auth/AuthContainer";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useAuthData } from "@/store/auth/AuthData";
import { fnFormatPhone } from "@/utils/functions/fnFormatPhone";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";

export default function Forgot() {

    const authHook = useAuthData();
    const [user, setUser] = useState<{
        email: string;
    }>({
        email: '',
    });
    const [alert, setAlert] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signupConfirm, setSignupConfirm] = useState<boolean>(false);

    const router = useRouter();

    const forgot = () => {

        const hasEmptyField = Object.values(user).some(value => value.trim() === '');
        if (hasEmptyField) return

        setIsLoading(true)
        authHook.fnFetchForgot({
            email: user.email,
        })
            .then(() => {
                setSignupConfirm(true);
            })
            .catch(() => setAlert({ show: true, message: 'Conta inválida' }))
            .finally(() => setIsLoading(false))
    }

    if (signupConfirm) {
        return (
            <AuthContainer>
                <div className="bg-white w-11/12 sm:w-[560px] rounded-lg py-10 px-10 sm:px-20 flex items-center flex-col">

                    <div className="text-6xl text-green-600">
                        <BiCheck />
                    </div>

                    <div className="text-center py-4">

                        <h4 className="text-2xl font-extrabold">E-mail enviado</h4>
                        <p>Um email foi enviado para a sua caixa de entrada. Caso não encontre, verifique na caixa de SPAM.</p>

                    </div>

                    <div className="flex justify-center">
                        <Button
                            label="Voltar para o login"
                            onClick={() => { router.push("/auth/login") }}
                        />
                    </div>
                </div>
            </AuthContainer>
        )
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
                        label="Seu e-mail de cadastro"
                        value={user.email}
                        type="email"
                        onChange={(e) => {
                            setAlert({ ...alert, show: false });
                            setUser({
                                ...user,
                                email: e.target.value
                            })
                        }}
                    />


                    {
                        alert.show && (
                            <div className="border border-rose-500 bg-rose-100 py-2 px-4 rounded-md text-rose-700">
                                {alert.message}
                            </div>
                        )
                    }

                    <div className="flex justify-center">
                        <Button
                            label="Recuperar senha"
                            isLoading={isLoading}
                            onClick={forgot}
                            isDisabled={user.email === ''}
                        />
                    </div>
                </div>

                <div className="py-6 text-center text-lg">
                    Já tem uma conta?
                    <a href="/auth/login">
                        <b className="text-violet-800 ml-2">Faça o login</b>
                    </a>
                </div>

            </div>
        </AuthContainer>
    )
}