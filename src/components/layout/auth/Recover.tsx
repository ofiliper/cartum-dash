'use client'

import AuthContainer from "@/components/shared/Auth/AuthContainer";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useAuthData } from "@/store/auth/AuthData";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";

export default function Recover() {

    const searchParams = useSearchParams();
    const authHook = useAuthData();

    const email = searchParams.get('e');
    const token = searchParams.get('t');

    const [user, setUser] = useState<{ pass: string; pass2: string; }>({ pass: '', pass2: '', });
    const [alert, setAlert] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [changePassConfirm, setChangePassConfirm] = useState<boolean>(false);

    useEffect(() => {

        if (!email || !token) {
            router.push(`${process.env.NEXT_PUBLIC_URL}/auth/login`)
        }

    }, [])



    const router = useRouter();

    const changePass = () => {

        const hasEmptyField = Object.values(user).some(value => value.trim() === '');
        if (hasEmptyField) return

        setIsLoading(true)
        authHook.fnResetPassword({
            password: user.pass,
            email: email!,
            token: token!,
        })
            .then(() => {
                setChangePassConfirm(true);
            })
            .catch(() => setAlert({ show: true, message: 'Conta inválida' }))
            .finally(() => setIsLoading(false))
    }

    if (changePassConfirm) {
        return (
            <AuthContainer>
                <div className="bg-white w-11/12 sm:w-[560px] rounded-lg py-10 px-10 sm:px-20 flex items-center flex-col">

                    <div className="text-6xl text-green-600">
                        <BiCheck />
                    </div>

                    <div className="text-center py-4">

                        <h4 className="text-2xl font-extrabold">Senha alterada com sucesso</h4>
                        <p>Sua senha foi alterada com sucesso, efetue o login com seu email e sua nova senha.</p>

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
                    <Image
                        src="/images/cartum.png"
                        alt="Cartum.com.br"
                        height={50}
                        width={180}
                        className="w-[180px]"
                    />
                </div>
                <div className="flex flex-col gap-2">

                    <Input
                        label="Sua nova senha"
                        value={user.pass}
                        type="password"
                        onChange={(e) => {
                            setAlert({ ...alert, show: false });
                            setUser({
                                ...user,
                                pass: e.target.value
                            })
                        }}
                    />

                    <Input
                        label="Repita a sua nova senha"
                        value={user.pass2}
                        type="password"
                        onChange={(e) => {
                            setAlert({ ...alert, show: false });
                            setUser({
                                ...user,
                                pass2: e.target.value
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
                            onClick={changePass}
                            isDisabled={user.pass == '' || user.pass2 == ''}
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