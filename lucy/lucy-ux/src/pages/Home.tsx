import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MOCK_PARKS } from "../data/mockData";
import { Navigation } from "../components/Navigation";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";

export default function Home() {
    // Manejador generico para cuando una imagen no carga
    const handleImageError = (e: Event) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = DEFAULT_IMAGE;
    };

    return (
        <div class="min-h-screen bg-lucy-dark">
            {/* Cabecera */}
            <header class="bg-lucy-primary relative overflow-hidden">
                <div class="absolute inset-0 opacity-20 pointer-events-none">
                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" stroke-width="2" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" stroke-width="2" />
                    </svg>
                </div>

                <div class="max-w-6xl mx-auto p-8 pt-16 pb-24 relative z-10 flex justify-between items-start">
                    <div class="max-w-md">
                        <h1 class="text-white text-5xl md:text-6xl font-bold leading-tight uppercase relative inline-block">
                            Festival<br/>
                            Internacional<br/>
                            de las<br/>
                            Luciernagas
                            <div class="absolute -bottom-4 left-0 w-full h-2 bg-white"></div>
                        </h1>
                    </div>

                    <Navigation>
                        <A href="/mapa" class="inline-flex items-center gap-2 bg-lucy-dark text-white px-6 py-3 rounded-full font-fira text-sm hover:bg-black transition-colors shadow-lg shadow-black/20">
                            Ver mapa
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </A>
                    </Navigation>
                </div>
            </header>

            {/* Seccion "Explora" */}
            <main class="max-w-6xl mx-auto p-8 pt-12">
                <h2 class="text-white text-4xl mb-10">Explora</h2>

                <div class="space-y-12">
                    <For each={MOCK_PARKS}>
                        {(park) => (
                            <div class="group">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Caja de Imagen 1 */}
                                    <div class="bg-lucy-dark aspect-video w-full rounded-sm overflow-hidden relative shadow-md">
                                        <img
                                            src={park.image}
                                            alt={`Vista de ${park.name}`}
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    {/* Caja de Imagen 2*/}
                                    <div class="bg-lucy-dark aspect-video w-full rounded-sm overflow-hidden relative shadow-md flex items-center justify-end pr-4">
                                        <img
                                            src={`https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80&sig=${park.id}`}
                                            alt={`Mapa o galería de ${park.name}`}
                                            class="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                                            onError={handleImageError}
                                        />
                                        <button class="w-10 h-10 bg-lucy-dark rounded-full flex items-center justify-center text-white z-10 hover:scale-110 transition-transform shadow-lg cursor-pointer">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Etiqueta y Boton inferior */}
                                <div class="flex justify-between items-center mt-4">
                                    <h3 class="text-white text-3xl">{park.name}</h3>
                                    <A
                                        href={`/park/${park.id}`}
                                        class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-6 py-2 rounded-full font-fira text-sm font-bold hover:bg-white transition-colors"
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