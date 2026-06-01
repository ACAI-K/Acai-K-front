import { createSignal, createEffect, onMount, onCleanup, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { MOCK_PARKS } from "../data/mockData";
import type { Park } from "../data/types";
import { Navigation } from "../components/Navigation";
import { FilterMenu } from "../components/FilterMenu";
import { WeatherMenu } from "../components/WeatherMenu";
import { LucyIconButtonNoA, LucyButtonNoA } from "../components/LucyButton";
import CloudSunRain from 'lucide-solid/icons/cloud-sun-rain';
import LightBulb from 'lucide-solid/icons/lightbulb';
import ChrevronRight from 'lucide-solid/icons/chevron-right';
import Download from 'lucide-solid/icons/download';
import SlidersHorizontal from 'lucide-solid/icons/sliders-horizontal';
import Search from 'lucide-solid/icons/search';

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
    const [isDarkMode, setDarkMode] = createSignal(false);
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
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-lucy-dark/80 text-lucy-light text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
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
                marker.iconDiv.className = "w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg bg-lucy-secondary text-lucy-dark border-lucy-light scale-110 transition-colors duration-300";
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
        <div class={`${isDarkMode() ? 'dark' : ''}`}>
        <div class="relative w-full h-screen overflow-hidden bg-gray-900 font-work">

            <Navigation/>

            <div ref={mapRef} class="absolute inset-0 w-full h-full z-0"></div>

            <div class="absolute top-3.75 left-10 right-10 z-60 flex justify-center pointer-events-none">
                <div class="flex flex-col items-end gap-4 pointer-events-auto w-full max-w-3xl px-4">
                    <div class="w-full flex items-center bg-lucy-dark text-lucy-light rounded-full px-6 py-4 shadow-xl transition-colors">
                        <input
                            type="text" placeholder="Busca en el mapa"
                            class="w-full text-xl placeholder-lucy-light/50 transition-colors focus:outline-none"
                            onInput={(e) => setSearchQuery(e.currentTarget.value)}
                        />
                        <Search class="text-lucy-light hover:text-lucy-secondary transition-colors cursor-pointer" size={25} stroke-width={2} absoluteStrokeWidth={true} onClick={() => console.log("Buscar en el mapa:", searchQuery())} />
                    </div>

                    <LucyIconButtonNoA ButtonBackground={isFilterOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIcon={<SlidersHorizontal size={30}/>} onClick={() => {setIsFilterOpen(!isFilterOpen()); setIsWeatherOpen(false);}} />
                </div>
            </div>

            <Show when={isFilterOpen()}>
                <FilterMenu onFilterChange={(filters) => setActiveFilters(filters)}/>
            </Show>

            <Show when={isWeatherOpen()}>
                <WeatherMenu/>
            </Show>

            <div class={`absolute top-0 right-0 h-full w-full max-w-md bg-lucy-dark text-lucy-light z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${selectedPark() ? 'translate-x-0' : 'translate-x-full'}`}>
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
                            <div class="mb-8">
                                <div class="w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-700">
                                    <img src={park().image} alt={park().name} class="w-full h-full object-cover"/>
                                </div>
                            </div>
                            <div class="mb-8 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                <p class="text-gray-300 mb-4 text-sm leading-relaxed">{park().description}</p>
                                <div class="flex flex-wrap gap-2">
                                    <For each={park().features}>
                                        {(feature) => <span class="bg-gray-800 text-lucy-secondary px-3 py-1 rounded-full text-xs font-semibold border border-gray-700">{feature}</span>}
                                    </For>
                                </div>
                            </div>
                            <div class="flex items-center justify-between mb-8">
                                <div>
                                    <p class="text-xs text-gray-400 uppercase tracking-wider">Precio desde</p>
                                    <p class="text-2xl font-bold text-lucy-light">${park().pricePerDay} MXN</p>
                                </div>
                                <A href={`/park/${park().id}`} class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-6 py-3 rounded-full font-fira font-bold hover:bg-lucy-light transition-colors shadow-[0_0_15px_rgba(146,204,211,0.3)]">
                                    Ver detalle
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </A>
                            </div>
                        </div>
                    )}
                </Show>
            </div>
            <div class="hidden md:flex relative text-lucy-dark md:bottom-8 md:absolute md:left-8 z-30">
                <LucyButtonNoA onClick={() => {setIsWeatherOpen(!isWeatherOpen())}} ButtonText="Clima" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<CloudSunRain size={30}/>} />
            </div>
            <div class="hidden md:absolute md:bottom-8 md:right-8 z-30 md:flex gap-4">
                <LucyButtonNoA onClick={() => {setDarkMode(!isDarkMode())}} ButtonText="Modo obscuro" ButtonBackground={!isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonForeground={isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonSize="md" ButtonIconSide="right" ButtonIcon={<LightBulb size={30}/>} />
                <LucyButtonNoA onClick={() => {window.location.href = "https://maps.app.goo.gl/A1fJASPq6cFSJw9s9"}} ButtonText="Mapa sin Conexión" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ChrevronRight size={30}/>} />
            </div>
        </div>
        <section class="md:hidden w-full absolute flex justify-center pointer-events-none gap-4 z-40 bottom-4">
            <LucyIconButtonNoA onClick={() => {setIsWeatherOpen(!isWeatherOpen())}} ButtonText="Clima" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<CloudSunRain size={30}/>} />
            <LucyIconButtonNoA onClick={() => {setDarkMode(!isDarkMode())}} ButtonText="Modo obscuro" ButtonBackground={!isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonForeground={isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonSize="md" ButtonIconSide="right" ButtonIcon={<LightBulb size={30}/>} />
            <LucyIconButtonNoA onClick={() => {window.location.href = "https://maps.app.goo.gl/A1fJASPq6cFSJw9s9"}} ButtonText="Mapa sin Conexión" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<Download size={30}/>} />
        </section>
        </div>
    );
}