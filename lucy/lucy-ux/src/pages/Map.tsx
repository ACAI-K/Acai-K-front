import { createSignal, createEffect, onMount, onCleanup, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { MOCK_PARKS } from "../data/mockData";
import type { Park } from "../data/types";
import { Navigation } from "../components/Navigation";
import { FilterMenu } from "../components/FilterMenu";
import { WeatherMenu } from "../components/WeatherMenu";

declare global {
    interface Window {
        google: any;
        initLucyMap: () => void;
    }
}

export default function Map() {
    let mapRef: HTMLDivElement | undefined;

    let mapMarkers: { parkId: string; iconDiv: HTMLElement; arrowDiv: HTMLElement }[] = [];

    const [isFilterOpen, setIsFilterOpen] = createSignal(false);
    const [isWeatherOpen, setIsWeatherOpen] = createSignal(false);
    const [selectedPark, setSelectedPark] = createSignal<Park | null>(null);
    const [searchQuery, setSearchQuery] = createSignal("");
    const [activeFilters, setActiveFilters] = createSignal({ categories: ["Parques"], rating: 4, amenities: [] });

    onMount(() => {
        window.initLucyMap = initMap;

        // Obtenemos la API Key desde las variables de entorno de Vite
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        const script = document.createElement("script");
        // Inyectamos la variable dinámicamente
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&callback=initLucyMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        onCleanup(() => {
            document.head.removeChild(script);
            delete window.initLucyMap;
        });
    });

    const initMap = () => {
        if (!mapRef || !window.google) return;

        const darkTheme = [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
            { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }
        ];

        const map = new window.google.maps.Map(mapRef, {
            center: { lat: 19.1255, lng: -98.7656 },
            zoom: 12,
            mapId: "LUCY_MAP_ID_MOCK",
            disableDefaultUI: true,
            styles: darkTheme
        });

        MOCK_PARKS.forEach(park => {
            // Verificamos que el parque tenga coordenadas antes de intentar pintarlo
            if (!park.coordinates) return;

            const markerContainer = document.createElement("div");
            markerContainer.className = "cursor-pointer transform hover:scale-110 transition-transform group relative";

            markerContainer.innerHTML = `
                <div class="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg bg-lucy-dark text-lucy-secondary border-lucy-secondary transition-colors duration-300">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/>
                    </svg>
                </div>
                <div class="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] mx-auto -mt-1 drop-shadow-md border-t-lucy-dark transition-colors duration-300"></div>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    ${park.name}
                </div>
            `;

            markerContainer.onclick = () => {
                setSelectedPark(park);
                // Leemos desde park.coordinates
                map.panTo({ lat: park.coordinates.lat, lng: park.coordinates.lng });
                map.setZoom(14);
            };

            mapMarkers.push({
                parkId: park.id,
                iconDiv: markerContainer.children[0] as HTMLElement,
                arrowDiv: markerContainer.children[1] as HTMLElement
            });

            new window.google.maps.marker.AdvancedMarkerElement({
                map,
                // Leemos desde park.coordinates
                position: { lat: park.coordinates.lat, lng: park.coordinates.lng },
                content: markerContainer,
                title: park.name
            });
        });
    };

    createEffect(() => {
        const currentPark = selectedPark();
        mapMarkers.forEach(marker => {
            if (currentPark && currentPark.id === marker.parkId) {
                marker.iconDiv.className = "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg bg-lucy-secondary text-lucy-dark border-white scale-110 transition-colors duration-300";
                marker.arrowDiv.className = "w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] mx-auto -mt-1 drop-shadow-md border-t-lucy-secondary transition-colors duration-300";
            } else {
                marker.iconDiv.className = "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg bg-lucy-dark text-lucy-secondary border-lucy-secondary transition-colors duration-300";
                marker.arrowDiv.className = "w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] mx-auto -mt-1 drop-shadow-md border-t-lucy-dark transition-colors duration-300";
            }
        });
    });

    createEffect(() => {
        const payload = { busqueda: searchQuery(), ...activeFilters() };
        console.log("🌐 [API MOCK] Enviando petición a Django con:", payload);
    });

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900 font-work">

            <div ref={mapRef} class="absolute inset-0 w-full h-full z-0"></div>
            <div class="absolute inset-0 bg-black/10 pointer-events-none z-10"></div>
            <Navigation class="absolute top-8 right-8 z-40"/>

            <div className="absolute top-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <div className="flex flex-col items-end gap-4 pointer-events-auto w-full max-w-3xl px-4">
                    <div className="w-full flex items-center bg-lucy-dark text-white rounded-full px-6 py-4 shadow-xl border border-lucy-dark/50">
                        <input
                            type="text" placeholder="Busca en el mapa"
                            className="bg-transparent border-none outline-none w-full text-lg placeholder-gray-400"
                            onInput={(e) => setSearchQuery(e.currentTarget.value)}
                        />
                        <button className="ml-4 hover:text-lucy-secondary transition-colors cursor-pointer">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>

                    <button
                        onClick={() => { setIsFilterOpen(!isFilterOpen()); setIsWeatherOpen(false); }}
                        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors border border-gray-700/50 cursor-pointer active:scale-95 ${isFilterOpen() ? 'bg-lucy-secondary text-lucy-dark' : 'bg-lucy-dark text-white hover:text-lucy-secondary'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <Show when={isFilterOpen()}>
                <FilterMenu onFilterChange={(filters) => setActiveFilters(filters)}/>
            </Show>

            <Show when={isWeatherOpen()}>
                <WeatherMenu/>
            </Show>

            <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-lucy-dark text-white z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${selectedPark() ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={() => setSelectedPark(null)} className="absolute top-4 right-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700 z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <Show when={selectedPark()}>
                    {(park) => (
                        <div className="p-8 pt-16">
                            <h2 class="text-3xl font-fira mb-1 text-lucy-primary">{park().name}</h2>
                            <p class="text-gray-400 mb-2">Parque Protegido</p>
                            <div className="flex items-center gap-2 mb-6 text-sm">
                                <span class="text-lucy-primary">📍</span>
                                <span class="text-gray-300">{park().location}</span>
                            </div>
                            <div className="mb-8">
                                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-700">
                                    <img src={park().image} alt={park().name} class="w-full h-full object-cover"/>
                                </div>
                            </div>
                            <div className="mb-8 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                <p class="text-gray-300 mb-4 text-sm leading-relaxed">{park().description}</p>
                                <div className="flex flex-wrap gap-2">
                                    <For each={park().features}>
                                        {(feature) => <span class="bg-gray-800 text-lucy-secondary px-3 py-1 rounded-full text-xs font-semibold border border-gray-700">{feature}</span>}
                                    </For>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p class="text-xs text-gray-400 uppercase tracking-wider">Precio desde</p>
                                    <p class="text-2xl font-bold text-white">${park().pricePerDay} MXN</p>
                                </div>
                                <A href={`/park/${park().id}`} class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-6 py-3 rounded-full font-fira font-bold hover:bg-white transition-colors shadow-[0_0_15px_rgba(146,204,211,0.3)]">
                                    Ver detalle
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </A>
                            </div>
                        </div>
                    )}
                </Show>
            </div>

            <div className="absolute bottom-8 left-8 z-30">
                <button
                    onClick={() => { setIsWeatherOpen(!isWeatherOpen()); setIsFilterOpen(false); }}
                    className={`px-6 py-2 rounded-full font-fira font-bold flex items-center gap-2 shadow-lg transition-colors cursor-pointer ${isWeatherOpen() ? 'bg-lucy-secondary text-lucy-dark' : 'bg-lucy-primary text-lucy-dark hover:bg-white'}`}
                >
                    Clima
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                </button>
            </div>

            <div className="absolute bottom-8 right-8 z-30 flex gap-4">
                <button className="bg-lucy-dark text-white px-6 py-2 rounded-full font-fira text-sm flex items-center gap-2 shadow-lg border border-gray-700 hover:text-lucy-secondary transition-colors">
                    Modo Obscuro <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                </button>
                <button className="bg-lucy-primary text-lucy-dark px-6 py-2 rounded-full font-fira font-bold flex items-center gap-2 shadow-lg hover:bg-white transition-colors">
                    Descarga Mapa <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
            </div>
        </div>
    );
}