import { For } from "solid-js";
import { A } from "@solidjs/router";
import { MOCK_PARKS } from "../data/mockData";

// URL de una imagen por defecto (bosque/naturaleza) en caso de error
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";

export default function Home() {
    // Manejador genérico para cuando una imagen no carga
    const handleImageError = (e: Event) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = DEFAULT_IMAGE;
    };

    return (
        <div class="min-h-screen bg-lucy-dark">
            {/* Cabecera asimétrica */}
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

                    <nav class="text-right flex flex-col items-end space-y-2">
                        <button class="text-white mb-4 hover:text-lucy-dark transition-colors">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <A href="/" class="text-white font-work font-semibold text-lg hover:text-lucy-dark transition-colors">Inicio</A>
                        <A href="/explorar" class="text-white font-work font-semibold text-lg hover:text-lucy-dark transition-colors">Explorar</A>
                        <A href="/hospedaje" class="text-white font-work font-semibold text-lg hover:text-lucy-dark transition-colors">Hospedaje</A>
                        <A href="/cuenta" class="text-white font-work font-semibold text-lg hover:text-lucy-dark transition-colors">Cuenta</A>

                        <div class="pt-12">
                            <A href="/mapa" class="inline-flex items-center gap-2 bg-lucy-dark text-white px-6 py-3 rounded-full font-fira text-sm hover:bg-black transition-colors shadow-lg shadow-black/20">
                                Ver mapa
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </A>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Sección "Explora" */}
            <main class="max-w-6xl mx-auto p-8 pt-12">
                <h2 class="text-white text-4xl mb-10">Explora</h2>

                <div class="space-y-12">
                    <For each={MOCK_PARKS}>
                        {(park) => (
                            <div class="group">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Caja de Imagen 1 (Principal) */}
                                    <div class="bg-lucy-dark aspect-video w-full rounded-sm overflow-hidden relative shadow-md">
                                        <img
                                            src={park.image}
                                            alt={`Vista de ${park.name}`}
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    {/* Caja de Imagen 2 (Secundaria con botón) */}
                                    <div class="bg-lucy-dark aspect-video w-full rounded-sm overflow-hidden relative shadow-md flex items-center justify-end pr-4">
                                        {/* Al no tener una segunda imagen en el mockData, usamos una genérica distinta,
                        o podrías mapear una propiedad 'mapImage' en el futuro */}
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

                                {/* Etiqueta y Botón inferior */}
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