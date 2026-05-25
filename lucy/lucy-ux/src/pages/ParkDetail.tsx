import { useParams, A } from "@solidjs/router";
import { MOCK_PARKS } from "../data/mockData";
import { For, Show } from "solid-js";

export default function ParkDetail() {
    const params = useParams();

    // Obtenemos el parque desde el mock usando el ID de la URL
    const park = () => MOCK_PARKS.find(p => p.id === params.id);

    return (
        <Show
            when={park()}
            fallback={
                <div class="min-h-screen bg-lucy-dark text-white p-8 flex flex-col items-center justify-center font-fira text-2xl">
                    <p>Parque no encontrado.</p>
                    <A href="/explorar" class="text-lucy-secondary mt-4 text-lg underline">Volver a explorar</A>
                </div>
            }
        >
            {(p) => (
                <div class="bg-lucy-dark text-white font-work pb-24">

                    {/* 1. Sección Hero (Imagen principal y Título) */}
                    <div class="relative w-full h-[50vh] min-h-[400px]">
                        <img src={p().image} alt={p().name} class="w-full h-full object-cover" />
                        {/* Gradiente para asegurar que el texto sea legible sobre la imagen */}
                        <div class="absolute inset-0 bg-gradient-to-t from-lucy-dark via-lucy-dark/70 to-black/30"></div>

                        <div class="absolute inset-0 flex flex-col justify-between max-w-6xl mx-auto p-8">
                            {/* Breadcrumb / Botón de retroceso */}
                            <A href="/" class="inline-flex items-center gap-2 text-white hover:text-lucy-secondary transition-colors font-fira bg-black/40 w-fit px-5 py-2 rounded-full backdrop-blur-md border border-white/10">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                Volver
                            </A>

                            <div>
                <span class="text-lucy-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                  📍 {p().location}
                </span>
                                <h1 class="text-5xl md:text-7xl font-bold font-fira text-white leading-tight drop-shadow-2xl">
                                    {p().name}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* 2. Cuadrícula de Contenido */}
                    <div class="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 relative z-10">

                        {/* Columna Izquierda: Descripción y Características */}
                        <div class="lg:col-span-2 space-y-12">

                            <section>
                                <h3 class="text-3xl font-fira text-lucy-primary mb-6">Acerca de este lugar</h3>
                                <div class="bg-gray-800/60 rounded-3xl p-8 border border-gray-700 shadow-xl leading-relaxed text-gray-300 text-lg">
                                    <p>{p().description}</p>
                                </div>
                            </section>

                            <section>
                                <h3 class="text-3xl font-fira text-lucy-primary mb-6">Amenidades</h3>
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <For each={p().features}>
                                        {(feature) => (
                                            <div class="flex items-center gap-3 bg-gray-800/80 border border-gray-700 px-5 py-4 rounded-2xl hover:border-lucy-secondary transition-colors cursor-default">
                                                <div class="w-2.5 h-2.5 rounded-full bg-lucy-secondary shadow-[0_0_8px_rgba(255,200,76,0.8)]"></div>
                                                <span class="text-gray-200 font-medium text-sm">{feature}</span>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </section>
                        </div>

                        {/* Columna Derecha: Tarjeta de Reservación Fija (Sticky) */}
                        <div class="lg:col-span-1">
                            <div class="bg-lucy-primary rounded-3xl p-8 text-lucy-dark shadow-[0_20px_50px_rgba(146,204,211,0.15)] sticky top-8 border border-white/20">
                                <div class="mb-8">
                                    <p class="text-lucy-dark/70 font-semibold uppercase tracking-wider text-sm mb-1">Tarifa por día</p>
                                    <div class="flex items-end gap-1">
                                        <span class="text-5xl font-fira font-bold tracking-tighter">${p().pricePerDay}</span>
                                        <span class="text-lg font-bold mb-1">MXN</span>
                                    </div>
                                </div>

                                <div class="space-y-4 mb-8">
                                    <div class="bg-white/40 rounded-xl p-5 border border-lucy-dark/10">
                                        <div class="flex items-center justify-between mb-2">
                                            <p class="text-xs font-bold uppercase tracking-wider text-lucy-dark/70">Fechas</p>
                                            <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <p class="font-medium text-sm">Se seleccionarán en el Checkout</p>
                                    </div>
                                </div>

                                <A
                                    href="/checkout"
                                    class="flex items-center justify-center gap-2 w-full bg-lucy-dark text-white py-4 rounded-xl font-fira font-bold text-lg hover:bg-black transition-all transform hover:-translate-y-1 shadow-xl"
                                >
                                    Continuar
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </A>

                                <p class="text-center text-xs font-semibold mt-6 text-lucy-dark/60">
                                    No se hará ningún cargo en este paso.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </Show>
    );
}