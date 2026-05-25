import { createSignal, createEffect, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import mapaSatelite from "../assets/placeholderMapa.png"; // Asegúrate de mantener tu ruta correcta
import { MOCK_PARKS } from "../data/mockData";
import type {Park} from "../data/types"; // Importamos la interfaz para tipar el estado
// Importamos la interfaz para tipar el estado

const CATEGORIES = ["Parques", "Hoteles", "Cabañas", "Campamentos", "Hospitales", "Policía", "Gasolinería"];
const AMENITIES = [
    { id: "wifi", label: "Wi-Fi", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
    { id: "parking", label: "Estacionamiento", isTextIcon: true, textIcon: "P" },
    { id: "breakfast", label: "Desayuno", icon: "M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" },
    { id: "pets", label: "Pet-friendly", isTextIcon: true, textIcon: "🐾" }
];

// Generamos posiciones random entre el 20% y el 80% de la pantalla para evitar que caigan en los bordes
const PARKS_WITH_POSITIONS = MOCK_PARKS.map(park => ({
    ...park,
    top: Math.floor(Math.random() * 60) + 20,
    left: Math.floor(Math.random() * 60) + 20
}));

export default function Map() {
    const [isFilterOpen, setIsFilterOpen] = createSignal(false);

    // Cambiamos el estado booleano por uno que guarde todo el objeto del parque seleccionado
    const [selectedPark, setSelectedPark] = createSignal<Park | null>(null);

    // Estado de filtros
    const [selectedCategories, setSelectedCategories] = createSignal<string[]>(["Parques"]);
    const [selectedAmenities, setSelectedAmenities] = createSignal<string[]>([]);
    const [searchQuery, setSearchQuery] = createSignal("");

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleAmenity = (id: string) => {
        setSelectedAmenities(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    createEffect(() => {
        const payload = {
            busqueda: searchQuery(),
            categorias: selectedCategories(),
            amenidades: selectedAmenities()
        };
        console.log("🌐 [API MOCK] Enviando petición al backend con:", payload);
    });

    return (
        <div class="relative w-full h-screen overflow-hidden bg-gray-900 font-work">

            {/* Fondo del Mapa */}
            <img src={mapaSatelite} alt="Mapa" class="absolute inset-0 w-full h-full object-cover opacity-80" />

            {/* Barra de Búsqueda Superior */}
            <div class="absolute top-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <div class="flex items-center gap-4 pointer-events-auto w-full max-w-3xl px-4">
                    <div class="flex-grow flex items-center bg-lucy-dark text-white rounded-full px-6 py-4 shadow-xl border border-lucy-dark/50">
                        <input
                            type="text" placeholder="Busca en el mapa"
                            class="bg-transparent border-none outline-none w-full text-lg placeholder-gray-400"
                            onInput={(e) => setSearchQuery(e.currentTarget.value)}
                        />
                        <button class="ml-4 hover:text-lucy-secondary transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </button>
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen())}
                        class={`p-4 rounded-full shadow-xl transition-colors ${isFilterOpen() ? 'bg-lucy-secondary text-lucy-dark' : 'bg-lucy-dark text-white hover:text-lucy-secondary'}`}
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                    </button>
                </div>
            </div>

            {/* Menu de Filtro */}
            <Show when={isFilterOpen()}>
                <div class="absolute top-28 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl bg-lucy-dark text-white rounded-3xl p-8 shadow-2xl border border-gray-800 animate-fade-in">
                    {/* Contenido del filtro */}
                    <div class="text-center text-gray-400 mt-4 text-sm font-fira">Menú de filtros activo</div>
                </div>
            </Show>

            {/* RENDERIZADO DE PINES */}
            <For each={PARKS_WITH_POSITIONS}>
                {(park) => (
                    <div
                        class="absolute z-20 -mt-8 -ml-4 cursor-pointer transform hover:scale-110 transition-transform group"
                        style={`top: ${park.top}%; left: ${park.left}%;`}
                        onClick={() => setSelectedPark(park)}
                    >
                        {/* Burbuja del Pin */}
                        <div class={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors duration-300 ${selectedPark()?.id === park.id ? 'bg-lucy-secondary text-lucy-dark border-white scale-110' : 'bg-lucy-dark text-lucy-secondary border-lucy-secondary'}`}>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>
                        </div>
                        {/* Punta inferior del pin */}
                        <div class={`w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] mx-auto -mt-1 drop-shadow-md transition-colors duration-300 ${selectedPark()?.id === park.id ? 'border-t-lucy-secondary' : 'border-t-lucy-dark'}`}></div>

                        {/* Tooltip flotante al pasar el mouse */}
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {park.name}
                        </div>
                    </div>
                )}
            </For>

            {/* BARRA LATERAL */}
            <div class={`absolute top-0 right-0 h-full w-full max-w-md bg-lucy-dark text-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${selectedPark() ? 'translate-x-0' : 'translate-x-full'}`}>

                <button onClick={() => setSelectedPark(null)} class="absolute top-4 right-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700 z-10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                <Show when={selectedPark()}>
                    {(park) => (
                        <div class="p-8 pt-16">
                            <h2 class="text-3xl font-fira mb-1 text-lucy-primary">{park().name}</h2>
                            <p class="text-gray-400 mb-2">Parque Protegido</p>

                            <div class="flex items-center gap-2 mb-6 text-sm">
                                <span class="text-lucy-primary">📍</span>
                                <span class="text-gray-300">{park().location}</span>
                            </div>

                            {/* Galería Dinámica */}
                            <div class="mb-8">
                                <div class="w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-700">
                                    <img src={park().image} alt={park().name} class="w-full h-full object-cover" />
                                </div>
                            </div>

                            {/* Detalles y Amenidades */}
                            <div class="mb-8 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                <p class="text-gray-300 mb-4 text-sm leading-relaxed">{park().description}</p>
                                <div class="flex flex-wrap gap-2">
                                    <For each={park().features}>
                                        {(feature) => (
                                            <span class="bg-gray-800 text-lucy-secondary px-3 py-1 rounded-full text-xs font-semibold border border-gray-700">
                        {feature}
                      </span>
                                        )}
                                    </For>
                                </div>
                            </div>

                            <div class="flex items-center justify-between mb-8">
                                <div>
                                    <p class="text-xs text-gray-400 uppercase tracking-wider">Precio desde</p>
                                    <p class="text-2xl font-bold text-white">${park().pricePerDay} MXN</p>
                                </div>
                                <A href={`/park/${park().id}`} class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-6 py-3 rounded-full font-fira font-bold hover:bg-white transition-colors shadow-[0_0_15px_rgba(146,204,211,0.3)]">
                                    Ver detalle
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </A>
                            </div>
                        </div>
                    )}
                </Show>
            </div>

            {/* Botones Flotantes Inferiores */}
            <div class="absolute bottom-8 left-8 z-30">
                <button class="bg-lucy-primary text-lucy-dark px-6 py-2 rounded-full font-fira font-bold flex items-center gap-2 shadow-lg hover:bg-white transition-colors">
                    Clima
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                </button>
            </div>

            <div class="absolute bottom-8 right-8 z-30 flex gap-4">
                <button class="bg-lucy-dark text-white px-6 py-2 rounded-full font-fira text-sm flex items-center gap-2 shadow-lg border border-gray-700 hover:text-lucy-secondary transition-colors">
                    Modo Obscuro
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                </button>
                <button class="bg-lucy-primary text-lucy-dark px-6 py-2 rounded-full font-fira font-bold flex items-center gap-2 shadow-lg hover:bg-white transition-colors">
                    Descarga Mapa
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
            </div>

        </div>
    );
}