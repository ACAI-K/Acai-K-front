import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MOCK_PARKS } from "../data/mockData";
import { ArrowRight } from 'lucide-solid';
import { Navigation } from "../components/Navigation";
import { LucyButton } from "../components/LucyButton";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";

export default function Home() {
    // Manejador generico para cuando una imagen no carga
    const handleImageError = (e: Event) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = DEFAULT_IMAGE;
    };

    return (
        <div class="bg-lucy-dark">
            <Navigation/>
            <header class="bg-lucy-primary relative overflow-hidden h-dvh w-full m-0 flex items-start justify-end sm:items-end flex-col gap-8 sm:flex-row sm:justify-between mx-auto p-16">
                <h1 class="text-lucy-light text-4xl md:text-5xl font-bold leading-tight relative inline-block">
                    Festival<br/>
                    Internacional<br/>
                    de las<br/>
                    Luciernagas
                    <div class="absolute left-0 w-full h-2 bg-lucy-light mt-1"></div>
                </h1>
                <LucyButton ButtonLink="/mapa" ButtonText="Ver el mapa" ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ArrowRight />} />
            </header>

            <main class="max-w-6xl mx-auto p-8 pt-12">
                <h2 class="text-lucy-light text-4xl font-medium text mb-10">Explora</h2>

                <div class="space-y-12">
                    {/* TODO: Convertir a MOCK_LOCATIONS  */}
                    <For each={MOCK_PARKS}> 
                        {(park) => (
                            <div class="group">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Imagen 1 */}
                                    <div class="bg-lucy-dark aspect-video w-full rounded-sm overflow-hidden relative shadow-md">
                                        <img
                                            src={park.image}
                                            alt={`Vista de ${park.name}`}
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    {/* Imagen 2*/}
                                    <div class="bg-lucy-dark aspect-video w-full rounded-sm overflow-hidden relative shadow-md flex items-center justify-end pr-4">
                                        <img
                                            src={`https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80&sig=${park.id}`}
                                            alt={`Mapa o galería de ${park.name}`}
                                            class="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                                            onError={handleImageError}
                                        />
                                        <button class="w-10 h-10 bg-lucy-dark rounded-full flex items-center justify-center text-lucy-light z-10 hover:scale-110 transition-transform shadow-lg cursor-pointer">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Etiqueta y Boton inferior */}
                                <div class="flex justify-between items-center mt-4">
                                    <h3 class="text-lucy-light text-3xl">{park.name}</h3>
                                    <A
                                        href={`/park/${park.id}`}
                                        class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-6 py-2 rounded-full font-fira text-sm font-bold hover:bg-lucy-light transition-colors"
                                    >
                                        Ver en reservas
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </A>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </main>
        </div>
    );
}