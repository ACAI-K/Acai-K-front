import { useParams, A } from "@solidjs/router";
import { MOCK_LOCATIONS } from "../data/mockData";
import { For, Show } from "solid-js";
import { LucyButton, LucyButtonNoA } from "../components/LucyButton";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import type { PDI, TypeParque } from "../data/types";
import { Navigation } from "../components/Navigation";
import { useNavigate } from "@solidjs/router";

export default function ParkDetail() {
    const params = useParams();
    const navigate = useNavigate();

    const park = () => MOCK_LOCATIONS.find(location => 
                            location.puntos_interes.some(p => 
                                p.id === params.id))?.puntos_interes.find(p =>
                                    p.id === params.id) as TypeParque | undefined;

    return (
        <Show
            when={park()}
            fallback={
                <div class="min-h-screen bg-lucy-dark text-white p-8 flex flex-col items-center justify-center font-fira text-2xl">
                    <p>Parque no encontrado.</p>
                    <LucyButtonNoA onClick={() => {navigate(-1)}} ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="left" ButtonIcon={<ArrowLeft size={30}/>} class="z-50 max-w-fit" />
                </div>
            }
        >
            {(p) => (
                <div class="bg-lucy-dark text-white font-work pb-24">
                    <Navigation />

                    {/* Imagen principal y Titulo */}
                    <div class="relative w-full h-[50vh] min-h-[400px]">
                        <img src={p().images[0]} alt={p().name} class="w-full h-full object-cover" />
                        {/* Gradiente para asegurar que el texto sea legible sobre la imagen */}
                        <div class="absolute inset-0 bg-gradient-to-t from-lucy-dark via-lucy-dark/70 to-black/30"></div>

                        <div class="absolute inset-0 flex flex-col justify-between max-w-6xl mx-auto p-8">
                            {/* Boton de retroceso */}
                            <LucyButton ButtonLink='/' ButtonText="Volver a inicio" ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="left" ButtonIcon={<ArrowLeft size={30}/>} class="z-50 max-w-fit" />
                            <div>
                                <span class="text-lucy-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
                                    {p().location}
                                </span>
                                <h1 class="text-5xl md:text-7xl font-bold font-fira text-white leading-tight drop-shadow-2xl">
                                    {p().name}
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* 2. Cuadricula de Contenido */}
                    <div class="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 relative z-10">

                        {/* Columna Izquierda */}
                        <div class="lg:col-span-2 space-y-12">

                            <section>
                                <h3 class="text-3xl font-fira text-lucy-primary mb-6">Acerca de este lugar</h3>
                                <div class="bg-gray-800/60 rounded-3xl p-8 border border-gray-700 shadow-xl leading-relaxed text-gray-300 text-lg">
                                    <p>{p().description}</p>
                                </div>
                            </section>

                            <section>
                                <h3 class="text-3xl font-fira text-lucy-primary mb-6">Amenidades</h3>
                                <div class="flex flex-wrap md:grid-cols-3 gap-4">
                                    <For each={p().features}>
                                        {(amenidad) => (
                                            <div class="flex flex-col items-center gap-1 px-3 py-1 rounded-full text-xs text-lucy-light">
                                                {<amenidad.icono size={50} />}
                                                <span>{amenidad.nombre}</span>
                                            </div>
                                        )}
                                    </For>
                                </div>
                            </section>
                        </div>

                        {/* Columna Derecha */}
                        <div class="lg:col-span-1">
                            <div class="bg-lucy-primary rounded-3xl p-8 text-lucy-dark shadow-[0_20px_50px_rgba(146,204,211,0.15)] sticky top-8 border border-white/20">
                                <div class="mb-8">
                                    <p class="text-lucy-dark/70 font-semibold uppercase tracking-wider text-sm mb-1">Tarifa por día</p>
                                    <div class="flex items-end gap-1">
                                        <span class="text-5xl font-fira font-bold tracking-tighter">${p().precio_por_dia}</span>
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