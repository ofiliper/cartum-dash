'use client'
import Button from "@/components/shared/Button";
import Dashboard from "@/components/shared/Dashboard";
import ModalContainer from "@/components/shared/ModalContainer";
import Skeleton from "@/components/shared/Skeleton";
import { planStore } from "@/store/plans/plan-store";
import usePlanData from "@/store/plans/PlansData";
import fnFormatCurrency from "@/utils/functions/fnFormatCurrency";
import Image from "next/image";
import { useEffect } from "react";
import { useStore } from "zustand";
import ModalPix from "./modal/ModalPix";
import { actionStore } from "@/store/action/action-store";
import { usePaymentData } from "@/store/payment/PaymentData";
import { paymentSessionStore } from "@/store/payment/payment-store";

export default function Saldo() {

    const planHook = usePlanData();
    const paymentHook = usePaymentData();
    const plans = useStore(planStore);
    const action = useStore(actionStore);
    const payment = useStore(paymentSessionStore);

    const { list, isFetching } = plans.data;
    const { modalIsOpen, modalContent } = action.data;

    useEffect(() => {
        planHook.fnGetPlans();
    }, []);

    const generatePix = (plan: string) => {

        payment.fnOnChange("planName", plan)
        action.fnOnChange("modalIsOpen", true)
        action.fnOnChange("modalContent", "pix")

    }

    return (
        <Dashboard>
            <>
                {
                    modalIsOpen && (
                        <ModalContainer>
                            {modalContent === 'pix' ? <ModalPix /> : <></>}
                        </ModalContainer>
                    )
                }
                <div className="flex flex-col">

                    <div className="px-2 py-5">
                        <h4 className="text-2xl font-extrabold">
                            Adicionar saldo
                        </h4>
                        <p>
                            Inclua saldo em sua conta para gerar novas histórias.
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        {
                            isFetching
                                ? Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className="h-[280px] !w-[240px] shadow" />
                                ))
                                : list &&
                                list.map((item, i) => {
                                    const price = fnFormatCurrency(item.price).split('.');
                                    return (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center bg-gray-100 p-6 rounded shadow bg-white rounded-xl">
                                            <h3 className="text-3xl font-bold">
                                                {item.name}
                                            </h3>
                                            <div className="flex justify-center">
                                                <span className="mt-2 text-gray-600 flex items-center justify-center gap-2 border border-slate-400 rounded-2xl px-4 py-1">
                                                    <Image
                                                        src="/images/coin.png"
                                                        width={20}
                                                        height={20}
                                                        alt="flag" />
                                                    <span className="font-bold">
                                                        {item.credits} créditos
                                                    </span>
                                                </span>
                                            </div>

                                            <div className="py-4">
                                                <p className="text-3xl font-bold pt-4 flex items-center justify-center">
                                                    R$ <span className="text-6xl">{price[0]}</span>,{price[1]}
                                                </p>

                                                <p className="text-xs">
                                                    Cada crédito dá direito a 1 história.
                                                </p>
                                            </div>

                                            <Button
                                                label="Comprar agora"
                                                isLoading={payment.data.isFetching}
                                                onClick={() => {
                                                    generatePix(item.value)
                                                }} />
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </>
        </Dashboard>
    )
}