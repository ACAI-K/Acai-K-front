// src/pages/Explorar.tsx
import { A, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation";

export default function Explorar() {
    const navigate = useNavigate();

    // Listas de locaciones separadas para cada columna
    const leftLocations = ["Tlamanalco", "Texcoco", "Chalco"];
    const rightLocations = ["Ayapango", "Tepetlaoxtoc", "Ozumba"];

    return (
        <div class="min-h-screen bg-lucy-dark text-white flex flex-col font-work w-full overflow-x-hidden">

            {/* Cabecera superior de navegacion */}
            <div class="w-full max-w-7xl mx-auto px-8 pt-16 flex justify-end items-start h-24 shrink-0 z-50 relative">
                {/* Usamos el Navigation global, el cual ya trae el botón de cerrar */}
                <Navigation class="relative mt-2" />
            </div>

            {/* Area central de locaciones */}
            <div class="flex-grow w-full max-w-7xl mx-auto px-8 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">

                {/* COLUMNA IZQUIERDA */}
                <div class="flex flex-col space-y-8 w-full max-w-lg">
                    <h2 class="text-3xl font-fira font-bold text-white mb-4 tracking-wide pl-6">
                        Selecciona locación
                    </h2>

                    {/* Botón Principal con estilo destacado */}
                    <A
                        href="/resultados?q=Amecameca"
                        class="w-full bg-lucy-primary text-lucy-dark p-6 rounded-tl-[40px] rounded-br-[40px] flex justify-between items-center hover:bg-white transition-all shadow-xl group transform hover:-translate-y-0.5"
                    >
                        <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">Amecameca</span>
                        <span class="text-4xl font-fira font-bold group-hover:translate-x-2 transition-transform">{">"}</span>
                    </A>

                    {/* Resto de locaciones izquierdas */}
                    {leftLocations.map((loc) => (
                        <A
                            href={`/resultados?q=${loc}`}
                            class="w-full text-left bg-transparent p-6 flex justify-between items-center hover:text-lucy-secondary transition-colors group"
                        >
                            <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">{loc}</span>
                            <span class="text-4xl font-fira font-bold group-hover:translate-x-2 transition-transform">{">"}</span>
                        </A>
                    ))}
                </div>

                {/* COLUMNA DERECHA */}
                <div class="flex flex-col space-y-8 w-full max-w-lg md:mt-32 ml-auto">

                    {/* Locaciones derechas */}
                    {rightLocations.map((loc) => (
                        <A
                            href={`/resultados?q=${loc}`}
                            class="w-full text-right bg-transparent p-6 flex justify-between items-center hover:text-lucy-secondary transition-colors group"
                        >
                            <span class="text-4xl font-fira font-bold group-hover:-translate-x-2 transition-transform">{"<"}</span>
                            <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">{loc}</span>
                        </A>
                    ))}

                </div>

            </div>
        </div>
    );
}