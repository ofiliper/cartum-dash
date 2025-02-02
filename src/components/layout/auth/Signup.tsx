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

export default function Signup() {

    const authHook = useAuthData();
    const [user, setUser] = useState<{
        name: string;
        email: string;
        email2: string;
        phone: string;
        password: string;
    }>({
        email: '',
        email2: '',
        name: '',
        phone: '',
        password: '',
    });
    const [alert, setAlert] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [signupConfirm, setSignupConfirm] = useState<boolean>(false);

    const router = useRouter();

    const signup = () => {

        const hasEmptyField = Object.values(user).some(value => value.trim() === '');
        if (hasEmptyField) return

        if (user.email != user.email2) return setAlert({ show: true, message: 'Escreva corretamente seu e-mail, pois os endereços informados estão diferentes' })

        setIsLoading(true)
        authHook.fnFetchRegister({
            name: user.name,
            phone: user.phone,
            email: user.email,
            password: user.password
        })
            .then(() => {
                setSignupConfirm(true);
            })
            .catch(() => setAlert({ show: true, message: 'Conta inválida ou e-mail já cadastrado' }))
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

                        <h4 className="text-2xl font-extrabold">Conta criada com sucesso</h4>
                        <p>Clique abaixo e efetue o login.</p>

                    </div>

                    <div className="flex justify-center">
                        <Button
                            label="Fazer login agora"
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

                    <div className="sm:grid sm:grid-cols-2 gap-2">
                        <Input
                            label="Seu nome"
                            value={user.name}
                            onChange={(e) => {
                                setAlert({ ...alert, show: false });
                                setUser({
                                    ...user,
                                    name: e.target.value
                                })
                            }}
                        />

                        <Input
                            value={user.phone}
                            label="Sua telefone"
                            onChange={(e) => {
                                setAlert({ ...alert, show: false });
                                setUser({
                                    ...user,
                                    phone: fnFormatPhone(e.target.value)
                                })
                            }}
                        />
                    </div>


                    <div className="sm:grid sm:grid-cols-2 gap-2">

                        <Input
                            label="Seu e-mail"
                            type="email"
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
                            label="Repita o seu e-mail"
                            type="email"
                            value={user.email2}
                            onChange={(e) => {
                                setAlert({ ...alert, show: false });
                                setUser({
                                    ...user,
                                    email2: e.target.value
                                })
                            }}
                        />

                    </div>


                    <div>

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
                            label="Cadastrar agora"
                            isLoading={isLoading}
                            onClick={signup}
                            isDisabled={Object.values(user).some(value => value.trim() === '')}
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