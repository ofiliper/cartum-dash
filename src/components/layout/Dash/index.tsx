'use client'

import React from "react";
import Dashboard from "@/components/shared/Dashboard";
import './App.css'; // Arquivo CSS com os estilos
import Book from "@/components/shared/Book";

const Home = () => {
    return (
        <Dashboard>
            <div className="flex justify-between overflow-hidden w-full">
                <div className="px-4 py-4 w-4/12">
                    <div>
                        <h1 className="font-bold text-3xl mb-4">Crie sua história</h1>
                        <p className="text-sm">
                            Preencha os campos abaixo para criar uma história personalizada e única. Deixe sua criatividade fluir e veja a magia ganhar vida! Cada detalhe que você adicionar, desde o nome dos personagens até os desafios que enfrentarão, será transformado em uma narrativa exclusiva, feita especialmente para você. Imagine ser o autor de uma aventura onde tudo é do jeito que você sonhou – heróis corajosos, vilões intrigantes, cenários encantadores e reviravoltas emocionantes.
                        </p>
                        <br/>
                        <p className="text-sm">
                            Ao terminar de preencher os campos, nossa inteligência artificial vai transformar suas ideias em uma história completa, com imagens e até uma narração em áudio, para que você possa mergulhar ainda mais fundo no mundo que criou. Não importa se você quer uma fábula para crianças, uma jornada épica ou um conto divertido, aqui você tem o poder de construir algo especial.

                            Está pronto para começar? Então deixe sua imaginação falar mais alto e crie algo inesquecível. A aventura está a apenas alguns cliques de distância!
                        </p>
                    </div>

                </div>
                <div className="w-8/12">
                    <Book />
                </div>
            </div>
        </Dashboard >
    );
};

export default Home;
