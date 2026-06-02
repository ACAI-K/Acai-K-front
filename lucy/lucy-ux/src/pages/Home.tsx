import { For } from "solid-js";
import { A } from "@solidjs/router";
import type { PDI, TypeDormitorio, TypeParque, TypeOtro } from "../data/types";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData";
import ArrowRight from 'lucide-solid/icons/arrow-right';
import { Navigation } from "../components/Navigation";
import { LucyButton } from "../components/LucyButton";
import CardLocat from "../components/CardLocat";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";

// Manejador genérico para cuando una imagen no carga
const handleImageError = (e: Event) => {
    const target = e.currentTarget as HTMLImageElement;
    target.src = DEFAULT_IMAGE;
};

export default function Home() {
    return (
        <div class="relative bg-lucy-dark w-full min-h-screen flex flex-col items-center font-fira text-lucy-light">
            {/* HEADER */}
            <header class="bg-lucy-primary relative overflow-hidden min-h-[60dvh] md:h-dvh w-full m-0 flex flex-col justify-end sm:flex-row sm:justify-between sm:items-end gap-6 sm:gap-8 p-6 sm:p-10 md:p-16">
                <h1 class="text-lucy-light text-3xl sm:text-4xl md:text-5xl font-bold leading-tight relative inline-block">
                    Festival<br/>
                    Internacional<br/>
                    de las<br/>
                    Luciérnagas
                    <div class="absolute left-0 w-full h-1 sm:h-2 bg-lucy-light mt-1"></div>
                </h1>
                <div class="w-full sm:w-auto flex justify-start sm:justify-end">
                    <LucyButton
                        ButtonLink="/mapa"
                        ButtonText="Ver el mapa"
                        ButtonBackground="lucy-dark"
                        ButtonForeground="lucy-light"
                        ButtonSize="md"
                        ButtonIconSide="right"
                        ButtonIcon={<ArrowRight />}
                    />
                </div>
            </header>

            {/* MAIN */}
            <main class="w-full max-w-6xl mx-auto p-4 sm:p-8 pt-8 sm:pt-12 flex flex-col gap-4">
                <A href="/explorar" class="text-lucy-light text-3xl sm:text-4xl font-medium hover:text-lucy-secondary transition-colors">
                    Explora
                </A>

                {/* GRID PARA LAS TARJETAS */}
                <div class="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <For each={MOCK_LOCATIONS}>
                        {(locat) => (
                            <CardLocat locat={locat} />
                        )}
                    </For>
                </div>
            </main>
        </div>
    );
}