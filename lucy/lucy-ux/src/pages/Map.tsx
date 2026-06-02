import { createSignal, createEffect, onMount, onCleanup, For, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import type { PDI, TypeDormitorio, TypeParque, TypeOtro } from "../data/types";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData";
import { Navigation } from "../components/Navigation";
import { FilterMenu } from "../components/FilterMenu";
import { WeatherMenu } from "../components/WeatherMenu";
import { LucyIconButtonNoA, LucyButtonNoA, LucyButton } from "../components/LucyButton";
import CloudSunRain from 'lucide-solid/icons/cloud-sun-rain';
import LightBulb from 'lucide-solid/icons/lightbulb';
import ChrevronRight from 'lucide-solid/icons/chevron-right';
import Download from 'lucide-solid/icons/download';
import SlidersHorizontal from 'lucide-solid/icons/sliders-horizontal';
import Search from 'lucide-solid/icons/search';
import Home from 'lucide-solid/icons/home';
import Bed from 'lucide-solid/icons/bed';
import Warehouse from 'lucide-solid/icons/warehouse';
import TentTree from 'lucide-solid/icons/tent-tree'
import Shield from 'lucide-solid/icons/shield';
import Fuel from 'lucide-solid/icons/fuel';
import Ambulance from 'lucide-solid/icons/ambulance';
import { Logo } from '../assets/LogoIso';
import { render } from "solid-js/web";

declare global {
    interface Window {
        google: any;
        initLucyMap: () => void;
    }
}

const svgSize = 20;

// Definición del tema oscuro de Google Maps a nivel de archivo
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

function setIconForPDI(pdi: PDI) {
    const type = typeOfPDI(pdi);
    if (type === 0) {
        const dorm = pdi as TypeDormitorio;
        switch (dorm.categoria) {
            case "Hotel":
                return <Bed size={svgSize} />;
            case "Cabañas":
                return <Warehouse size={svgSize} />;
            case "Campamento":
                return <TentTree size={svgSize} />;
            case "Habitaciones":
                return <Home size={svgSize} />;
            default:
                return <Bed size={svgSize} />;
        }
    } else if (type === 1) {
        const park = pdi as TypeParque;
        switch (park.capacidad_actual) {
            case 0:
                return <Logo color="#8ed038" class="w-full" />;
            case 1:
                return <Logo color="#ffee00" class="w-full" />;
            case 2:
                return <Logo color="#c71400" class="w-full" />;
            default:
                return <Logo color="#e5e5e5" class="w-full" />;
        }
    } else {
        const otro = pdi as TypeOtro;
        switch (otro.categoria) {
            case "Policía":
                return <Shield size={svgSize} />;
            case "Hospital":
                return <Ambulance size={svgSize} />;
            case "Gasolinería":
                return <Fuel size={svgSize} />;
            default:
                return <Shield size={svgSize} />;
        }
    }
}


export default function Map() {
    let mapRef: HTMLDivElement | undefined;
    const [isGoogleLoaded, setIsGoogleLoaded] = createSignal(false);
    const [mapInstance, setMapInstance] = createSignal<any>(null);
    let mapMarkers: { pdiId: string; iconDiv: HTMLElement; arrowDiv: HTMLElement }[] = [];

    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = createSignal(false);
    const [isWeatherOpen, setIsWeatherOpen] = createSignal(false);
    const [isDarkMode, setDarkMode] = createSignal(false);
    const [selectedPDI, setSelectedPDI] = createSignal<PDI | null>(null);
    const [searchQuery, setSearchQuery] = createSignal("");
    const [activeFilters, setActiveFilters] = createSignal({ categories: ["Parques"], rating: 4, amenities: [] as string[] });

    onMount(() => {
        window.initLucyMap = initMap;

        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        const script = document.createElement("script");
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

        const map = new window.google.maps.Map(mapRef, {
            center: { lat: 19.1255, lng: -98.7656 },
            zoom: 12,
            mapId: "LUCY_MAP_ID_MOCK",
            disableDefaultUI: true,

            styles: isDarkMode() ? darkTheme : []
        });

        setMapInstance(map);

        MOCK_LOCATIONS.forEach(loc => {
            loc.puntos_interes.forEach(pdi => {
                if (!pdi.coordinates) return;

                const markerContainer = document.createElement("div");
                markerContainer.className = "cursor-pointer transform hover:scale-110 transition-transform group relative";

                const type = typeOfPDI(pdi);
                let colorClasses = "";

                if (type === 0) {
                    colorClasses = "bg-lucy-dark text-lucy-accent border-lucy-accent";
                } else if (type === 1) {
                    colorClasses = "bg-lucy-dark text-lucy-light border-lucy-light";
                } else {
                    colorClasses = "bg-lucy-dark text-lucy-accent border-lucy-accent";
                }

                markerContainer.innerHTML = `
                    <div class="icon-container w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors duration-300 ${colorClasses}">
                        </div>
                    <div class="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] mx-auto -mt-1 drop-shadow-md border-t-lucy-dark transition-colors duration-300"></div>
                    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1 bg-lucy-dark/80 text-lucy-light text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        ${pdi.name}
                    </div>
                `;

                const iconContainer = markerContainer.querySelector('.icon-container');

                if (iconContainer) {
                    render(() => setIconForPDI(pdi), iconContainer as HTMLElement);
                }

                markerContainer.onclick = () => {
                    setSelectedPDI(pdi);
                    map.panTo({ lat: pdi.coordinates.lat, lng: pdi.coordinates.lng });
                    map.setZoom(14);
                }

                mapMarkers.push({
                    pdiId: pdi.id,
                    iconDiv: markerContainer.children[0] as HTMLElement,
                    arrowDiv: markerContainer.children[1] as HTMLElement
                });

                new window.google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: { lat: pdi.coordinates.lat, lng: pdi.coordinates.lng },
                    content: markerContainer,
                    title: pdi.name
                });
            });
        });
    };


    createEffect(() => {
        const currentMap = mapInstance();
        if (currentMap) {
            currentMap.setOptions({
                styles: isDarkMode() ? darkTheme : null
            });
        }
    });

    createEffect(() => {
        const currentPDI = selectedPDI();
        mapMarkers.forEach(marker => {
            if (currentPDI && currentPDI.id === marker.pdiId) {
                marker.iconDiv.className = "icon-container w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg bg-lucy-secondary text-lucy-dark border-lucy-light scale-110 transition-colors duration-300";
                marker.arrowDiv.className = "w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] mx-auto -mt-1 drop-shadow-md border-t-lucy-secondary transition-colors duration-300";
            } else {
                marker.iconDiv.className = "icon-container w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg bg-lucy-dark text-lucy-secondary border-lucy-secondary transition-colors duration-300";
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
                            <button type="submit" class="w-fit h-fit" onClick={() => {navigate("/search?query=" + encodeURIComponent(searchQuery()));}}>
                                <Search class="text-lucy-light hover:text-lucy-secondary transition-colors cursor-pointer" size={25} stroke-width={2} absoluteStrokeWidth={true} onClick={() => console.log("Buscar en el mapa:", searchQuery())} />
                            </button>
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

                <div class={`absolute top-0 right-0 h-full w-full max-w-md bg-lucy-dark text-lucy-light z-50 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${selectedPDI() ? 'translate-x-0' : 'translate-x-full'}`}>
                    <button onClick={() => setSelectedPDI(null)} class="absolute top-4 right-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700 z-10">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                    <Show when={selectedPDI()}>
                        {(pdi) => (
                            <div class="p-8 pt-16">
                                <h2 class="text-3xl font-fira mb-1 text-lucy-primary">{pdi().name}</h2>
                                <p class="text-sm text-lucy-light mb-4">{pdi().categoria}</p>
                                <span class="text-lucy-light">{pdi().location}</span>
                                <div class="w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-lucy-disabled mb-8">
                                    <img src={pdi().images[0]} alt={pdi().name} class="w-full h-full object-cover"/>
                                </div>
                                <div class="mb-8 bg-light-dark/50 p-4 rounded-xl">
                                    <p class="text-gray-300 mb-4 text-sm leading-relaxed">{pdi().description}</p>
                                    <div class="flex flex-wrap gap-2">
                                        <Show when={typeOfPDI(pdi()) === 0 || typeOfPDI(pdi()) === 1}>
                                            <For each={pdi().features}>
                                                {(amenidad) => (
                                                    <div class="flex flex-col w-fit items-center gap-1 px-3 py-1 rounded-full text-xs text-lucy-light">
                                                        {<amenidad.icono size={15} />}
                                                        <span>{amenidad.nombre}</span>
                                                    </div>
                                                )}
                                            </For>
                                        </Show>
                                    </div>
                                </div>
                                <Show when={typeOfPDI(pdi()) === 0}>
                                    <div class="flex items-center justify-between mb-8">
                                        <div>
                                            <p class="text-xs text-gray-400 uppercase tracking-wider">Precio desde</p>
                                            <p class="text-2xl font-bold text-lucy-light">${(pdi() as TypeDormitorio).precio_noche} MXN</p>
                                        </div>

                                        <LucyButton ref={`/habitaciones/${pdi().id}`} ButtonText="Ver habitaciones" ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ChrevronRight size={30}/>} />
                                    </div>
                                </Show>
                                <Show when={typeOfPDI(pdi()) === 1}>
                                    <div class="flex items-center justify-between mb-8">
                                        <div>
                                            <p class="text-xs text-gray-400 uppercase tracking-wider">Precio desde</p>
                                            <p class="text-2xl font-bold text-lucy-light">${(pdi() as TypeParque).precio_por_dia} MXN</p>
                                        </div>

                                        <LucyButton ref={`/park/${pdi().name.toLowerCase}/${pdi().id}`} ButtonText="Ver detalle" ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ChrevronRight size={30}/>} />
                                    </div>
                                </Show>
                            </div>
                        )}
                    </Show>
                </div>
                {/* Botones de clima, modo obscuro y mapa sin conexión pantalla grande */}
                <div class="hidden md:flex relative text-lucy-dark md:bottom-8 md:absolute md:left-8 z-30">
                    <LucyButtonNoA onClick={() => {setIsWeatherOpen(!isWeatherOpen())}} ButtonText="Clima" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<CloudSunRain size={30}/>} />
                </div>
                <div class="hidden md:absolute md:bottom-8 md:right-8 z-30 md:flex gap-4">
                    <LucyButtonNoA onClick={() => {setDarkMode(!isDarkMode())}} ButtonText="Modo obscuro" ButtonBackground={!isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonForeground={isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonSize="md" ButtonIconSide="right" ButtonIcon={<LightBulb size={30}/>} />
                    <LucyButtonNoA onClick={() => {window.location.href = "https://maps.app.goo.gl/A1fJASPq6cFSJw9s9"}} ButtonText="Mapa sin Conexión" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ChrevronRight size={30}/>} />
                </div>
            </div>
            {/* Botones de clima, modo obscuro y mapa sin conexión pantalla pequeña */}
            <section class="md:hidden w-full absolute flex justify-center pointer-events-none gap-4 z-40 bottom-4">
                <LucyIconButtonNoA onClick={() => {setIsWeatherOpen(!isWeatherOpen())}} ButtonText="Clima" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<CloudSunRain size={30}/>} />
                <LucyIconButtonNoA onClick={() => {setDarkMode(!isDarkMode())}} ButtonText="Modo obscuro" ButtonBackground={!isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonForeground={isDarkMode() ? "lucy-secondary" : "lucy-dark"} ButtonSize="md" ButtonIconSide="right" ButtonIcon={<LightBulb size={30}/>} />
                <LucyIconButtonNoA onClick={() => {window.location.href = "https://maps.app.goo.gl/A1fJASPq6cFSJw9s9"}} ButtonText="Mapa sin Conexión" ButtonBackground={isWeatherOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<Download size={30}/>} />
            </section>
        </div>
    );
}