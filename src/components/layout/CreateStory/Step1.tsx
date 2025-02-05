'use client'

import React from "react";
import Dashboard from "@/components/shared/Dashboard";
import './App.css'; // Arquivo CSS com os estilos
import Book from "@/components/shared/Book";
import ModalContainer from "@/components/shared/ModalContainer";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/Textarea";
import Button from "@/components/shared/Button";
import { useStore } from "zustand";
import { createStoryStore } from "@/store/stories/create-story-store";
import Checkbox from "@/components/shared/Checkbox";
import { actionStore } from "@/store/action/action-store";
import Terms from "./modal/Terms";
import CreateStoryConfirm from "./modal/CreateStoryConfirm";
import { sessionStore } from "@/store/session/session-store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Step1() {

    const story = useStore(createStoryStore);
    const action = useStore(actionStore);
    const session = useStore(sessionStore);
    const router = useRouter();

    const { title, characters, challenges, gender, age, content, acceptTerms } = story.data;
    const { modalContent } = action.data;
    const { credits } = session.data;

    const openModal = (page: string) => {
        action.fnOnChange("modalIsOpen", true)
        action.fnOnChange("modalContent", page)
    }

    const openTerms = () => {
        openModal("terms");
    }

    const createStory = () => {
        if (credits <= 0) {
            toast.error("Você não possui créditos")
            setTimeout(() => router.push("/dashboard/saldo"), 2000)
            return
        };

        if (content === '' || gender === '' || characters === '') return toast.error("Preencha corretamente os campos.")

        if (!acceptTerms) return toast.error("Aceite os termos de uso.");
        openModal("confirm-story");
    }


    return (
        <Dashboard>
            <>
                <ModalContainer onClick={() => { action.fnOnChange("modalIsOpen", false) }}>
                    <>
                        {modalContent === 'terms' && (<Terms />)}
                        {modalContent === 'confirm-story' && (<CreateStoryConfirm />)}
                    </>
                </ModalContainer>
                <div className="px-4 py-4">
                    <div className="mb-7">
                        <h1 className="font-bold text-3xl mb-4">Crie sua história</h1>
                        <p className="text-xs sm:text-sm">
                            Crie uma história personalizada preenchendo os campos com detalhes como nomes de personagens e desafios. Nossa inteligência artificial transformará suas ideias em uma narrativa exclusiva, completa com imagens e narração em áudio. Seja uma fábula infantil, uma aventura épica ou um conto divertido, você tem o poder de criar algo único.
                        </p>
                    </div>

                    <div>
                        <div className="sm:grid sm:grid-cols-2 gap-10">
                            <Input
                                label="Título"
                                desc="Imagine um título"
                                placeholder="Mariana, a defensora do meio ambiente"
                                value={title}
                                onChange={(e) => { story.fnOnChange("title", e.target.value.slice(0, 100)) }}
                            />
                            <Input
                                label="Personagem"
                                desc="Quais são os personagens principais?"
                                value={characters}
                                placeholder="Ex.: Mariana, pele morena, cabelos encaracolados"
                                onChange={(e) => { story.fnOnChange("characters", e.target.value.slice(0, 255)) }}
                            />
                        </div>

                        <div className="sm:grid sm:grid-cols-2 gap-10">
                            <Input
                                label="Desafios"
                                desc="Quais os desafios que o personagem irá enfrentar?"
                                value={challenges}
                                placeholder="Ex.: O vilão é um homem que polui o meio ambiente"
                                onChange={(e) => { story.fnOnChange("challenges", e.target.value.slice(0, 255)) }}
                            />

                            <div className="sm:grid sm:grid-cols-2 gap-10">
                                <Select
                                    label="Gênero"
                                    desc="Gênero da história"
                                    value={gender}
                                    onClick={(select) => story.fnOnChange("gender", select.id)}
                                    options={[
                                        { "id": 'AVENTURA', "label": "Aventura" },
                                        { "id": 'CRISTA', "label": "Cristã" },
                                        { "id": 'FICCAO', "label": "Ficção Científica" },
                                        { "id": 'FANTASIA', "label": "Fantasia" },
                                        { "id": 'SUSPENSE', "label": "Suspense" },
                                        { "id": 'MISTERIO', "label": "Mistério" },
                                        { "id": 'COMEDIA', "label": "Comédia" },
                                    ]}
                                />
                                <Select
                                    label="Faixa etárea"
                                    desc="Faixa etária do leitor"
                                    value={age}
                                    onClick={(select) => story.fnOnChange("age", select.id)}
                                    options={[
                                        { "id": 'Entre 3 a 5 anos', "label": "3 a 5 anos" },
                                        { "id": 'Entre 5 a 8 anos', "label": "5 a 8 anos" },
                                        { "id": 'Entre 8 a 12 anos', "label": "8 a 12 anos" },
                                        { "id": 'Mais de 12 anos', "label": "+ de 12 anos" },
                                    ]}
                                />
                            </div>
                        </div>

                        <Textarea
                            label="Breve sinopse"
                            desc="Quais os desafios que o personagem irá enfrentar?"
                            placeholder="Ex.: Mariana sempre amou cuidar dos animais, mas um dia ela percebeu que a mata perto de sua casa estava diminuindo. Seu Paulo estava desmatando para construir um enorme estacionamento..."
                            value={content}
                            onChange={(e) => { story.fnOnChange("content", e.target.value.slice(0, 255)) }}
                            maxLength={255}
                        />

                        <div className="flex items-center gap-1 py-3">
                            <Checkbox
                                checked={acceptTerms}
                                onClick={() => story.fnOnChange("acceptTerms", !acceptTerms)} />
                            <span
                                onClick={() => story.fnOnChange("acceptTerms", !acceptTerms)}
                                className="text-xs font-bold">
                                Ao criar a história você declara estar de acordo com nossos
                                <button
                                    className="ml-1 underline"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openTerms()
                                    }}>
                                    termos de uso
                                </button>
                            </span>
                        </div>

                        <div className="py-4">
                            <Button
                                label={`${credits <= 0 ? 'Você não possui saldo' : 'Criar história agora'}`}
                                isDisabled={!acceptTerms || (credits <= 0)}
                                onClick={() => {
                                    createStory()
                                }}
                            />
                        </div>
                    </div>

                </div>

            </>
        </Dashboard >
    )
}