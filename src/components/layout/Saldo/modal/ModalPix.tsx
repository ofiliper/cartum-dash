'use client'

import Loader from "@/components/shared/Loader";
import { actionStore } from "@/store/action/action-store";
import { paymentSessionStore } from "@/store/payment/payment-store";
import { usePaymentData } from "@/store/payment/PaymentData";
import { useUserData } from "@/store/user/userData";
import { useEffect, useRef, useState } from "react";
import { BiCopy, BiX } from "react-icons/bi";
import { toast } from "react-toastify";
import { useStore } from "zustand";

export default function ModalPix() {

    const paymentHook = usePaymentData();
    const userHook = useUserData();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const consultIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const payment = useStore(paymentSessionStore);
    const action = useStore(actionStore);
    const [processed, setProcessed] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        paymentHook.fnFetchPix()
            .then((data) => {
                setIsLoading(false);
                consultPix(data);
            });

        return () => {
            if (consultIntervalRef.current) {
                clearInterval(consultIntervalRef.current);
            }
        };
    }, []);

    const consultPix = (content: any) => {
        consultIntervalRef.current = setInterval(() => {
            paymentHook.fnFetchPixConsult(content.data.paymentId)
                .then((response) => {
                    if (response.data.status === "approved") {
                        setProcessed(true)
                        userHook.fnFetchUser();
                        if (consultIntervalRef.current) {
                            clearInterval(consultIntervalRef.current);
                            consultIntervalRef.current = null;
                        }
                    }
                });
        }, 3000);
    };

    const closeModal = () => {
        if (consultIntervalRef.current) {
            clearInterval(consultIntervalRef.current);
            consultIntervalRef.current = null;
        }
        action.fnOnChange("modalIsOpen", false)
    }

    if (processed) {
        return (
            <div className="bg-white px-10 rounded-md w-full sm:w-[540px] relative">
                Serviço pago com sucesso.
            </div>
        )
    }

    return (
        <div className="bg-white px-10 rounded-md w-full sm:w-[540px] relative">
            <div>
                <button
                    onClick={closeModal}
                    className="absolute top-5 right-5 w-5 h-5 flex justify-center items-center rounded-full">
                    <BiX />
                </button>
            </div>
            <div className="pb-10">

                <div className="flex justify-center items-center py-10">
                    <div className="text-center">
                        <h2 className="font-bold text-4xl mb-4">
                            {/* {subscription.data.planName === "SIMPLE" && "Plano Simples"}
                            {subscription.data.planName === "BASIC" && "Plano Básico"}
                            {subscription.data.planName === "PREMIUM" && "Plano Premium"}
                            {subscription.data.planName === "PREMIUM_2022" && "Plano Premium"}
                            {subscription.data.planName === "PREMIUM_2023" && "Plano Premium"} */}
                        </h2>
                        <h4 className="font-bold text-2xl">Processe o pagamento</h4>
                        <p>Escaneie o QR Code abaixo e faça o pagamento</p>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-2 sm:gap-4">
                            <img src={`data:image/png;base64,${payment.data.qrcode_image}`} className="w-[150px] sm:w-[240px]" />
                            <div className="text-center bg-slate-100 border border-slate-300 py-2 px-5">
                                <span className="break-all text-xs">{payment.data.qrcode}</span>
                            </div>
                            <button
                                className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 py-1 px-3 rounded-md text-sm"
                                onClick={() => {
                                    toast.success("Código copiado");
                                    navigator.clipboard.writeText(payment.data.qrcode);
                                }}
                            >
                                <BiCopy />
                                <span>Copiar código</span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-3 sm:mt-10">
                    <button
                        className="border border-slate-300 py-3 px-5 rounded-md"
                        onClick={closeModal}
                    >
                        Escolher outro plano
                    </button>
                </div>
            </div>
        </div>
    )
}