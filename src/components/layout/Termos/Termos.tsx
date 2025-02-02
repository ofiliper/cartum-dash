import React from "react";

const TermosDeUso = () => {
    return (
        <div className="mx-auto p-6 text-sm">
            <h1 className="text-2xl font-bold">Termos de Uso</h1>
            <p className="text-sm text-gray-500">Última atualização: 01/02/2025</p>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">1. ACEITAÇÃO DOS TERMOS</h2>
                <p>
                    Ao acessar ou utilizar o Cartum.com.br, você concorda em cumprir estes Termos de Uso e nossa Política de Privacidade. Caso não concorde, recomendamos que não utilize nossos serviços.
                </p>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">2. DESCRIÇÃO DO SERVIÇO</h2>
                <p>
                    O Cartum.com.br permite que usuários criem histórias infantis personalizadas utilizando tecnologia de inteligência artificial. O serviço é fornecido como está, sem garantias de que as histórias geradas sejam completamente livres de erros, imprecisões ou inadequações para todas as faixas etárias.
                </p>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">3. USO ADEQUADO DA PLATAFORMA</h2>
                <ul className="list-disc ml-5">
                    <li>Utilizar o serviço apenas para fins pessoais e não comerciais, salvo autorização expressa;</li>
                    <li>Não utilizar a plataforma para gerar conteúdo ofensivo, discriminatório, violento, ilegal ou que infrinja direitos de terceiros;</li>
                    <li>Não explorar falhas ou vulnerabilidades da plataforma para obtenção de vantagens indevidas;</li>
                    <li>Não distribuir, modificar, revender ou explorar comercialmente o conteúdo gerado sem autorização.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">4. CONTA DE USUÁRIO</h2>
                <ul className="list-disc ml-5">
                    <li>Fornecer informações verdadeiras e atualizadas;</li>
                    <li>Manter a segurança da sua conta e senha;</li>
                    <li>Notificar imediatamente qualquer uso não autorizado da sua conta.</li>
                </ul>
                <p>O Cartum.com.br se reserva o direito de suspender ou encerrar contas que violem estes Termos.</p>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">5. PROPRIEDADE INTELECTUAL</h2>
                <p>
                    O Cartum.com.br mantém a propriedade intelectual da tecnologia de geração de histórias. No entanto, os usuários podem utilizar as histórias geradas para fins pessoais sem restrições. O uso comercial das histórias requer autorização prévia.
                </p>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">6. LIMITAÇÃO DE RESPONSABILIDADE</h2>
                <ul className="list-disc ml-5">
                    <li>Eventuais erros ou imprecisões nas histórias geradas;</li>
                    <li>Uso inadequado do conteúdo por parte dos usuários;</li>
                    <li>Danos diretos ou indiretos resultantes do uso do serviço;</li>
                    <li>Problemas técnicos ou falhas na plataforma.</li>
                </ul>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">7. POLÍTICA DE PRIVACIDADE</h2>
                <p>
                    Ao utilizar o serviço, você concorda com nossa Política de Privacidade, que rege a coleta e o uso de informações pessoais. Recomendamos a leitura completa do documento.
                </p>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">8. ALTERAÇÕES NOS TERMOS</h2>
                <p>
                    Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. O uso contínuo da plataforma após alterações indica sua aceitação.
                </p>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-semibold">9. CONTATO</h2>
                <p>
                    Caso tenha dúvidas sobre estes Termos, entre em contato pelo e-mail sac@cartum.com.br.
                </p>
            </section>
        </div>
    );
};

export default TermosDeUso;