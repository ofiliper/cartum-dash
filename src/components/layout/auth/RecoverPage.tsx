import { Suspense } from "react";
import Recover from "./Recover";

export default function RecoverPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Recover />
        </Suspense>
    );
}