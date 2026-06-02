import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData";
import ArrowRight from 'lucide-solid/icons/arrow-right';
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
        <div class="relative bg-lucy-dark w-full h-full min-h-screen flex flex-col items-center font-fira text-lucy-light'">
            <header class="bg-lucy-primary relative overflow-hidden h-dvh w-full max-w-480 max-h-270 m-0 flex justify-items-center-safe justify-end sm:items-end flex-col gap-8 sm:flex-row sm:justify-between p-16 mt-[-50px]">
                <h1 class="text-lucy-light text-4xl md:text-5xl font-bold leading-tight relative inline-block">
                    Festival<br/>
                    Internacional<br/>
                    de las<br/>
                    Luciérnagas
                    <div class="absolute left-0 w-full h-1 sm:h-2 bg-lucy-light mt-1"></div>
                </h1>

                {/* Contenedor del botón para asegurar que no se desborde en móvil */}
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

            <main class="max-w-screen mx-auto p-8 pt-12 flex flex-col gap-4">
                <A href="/explorar" class="text-lucy-light text-4xl font-medium text hover:text-lucy-secondary transition-colors ">
                Explora
                </A>

                {/* LISTA VERTICAL PARA LAS TARJETAS */}
                <div class="w-full mt-6 flex flex-col gap-4 sm:gap-6">
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