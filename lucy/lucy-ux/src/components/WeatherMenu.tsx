import { For } from "solid-js";
import Sun from 'lucide-solid/icons/sun';
import Cloud from 'lucide-solid/icons/cloud';
import CloudRain from 'lucide-solid/icons/cloud-rain';
import CloudLightning from 'lucide-solid/icons/cloud-lightning';


const WEATHER_DATA = [
    { day: "Do", tempMin: 3,  tempMax: 15, type: "thunder",  icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { day: "Lu", tempMin: 10, tempMax: 16, type: "rain",     icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" }, // Simplificados
    { day: "Ma", tempMin: 11, tempMax: 15, type: "cloudy",   icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
    { day: "Mi", tempMin: 13, tempMax: 19, type: "rain",     icon: "M12 3v1m0 16v1" },
    { day: "Ju", tempMin: 15, tempMax: 21, type: "sunny",    icon: "M12 3v2m0 14v2m9-9h-2M5 12H3m16.243-6.243l-1.414 1.414M7.172 16.828l-1.414 1.414m12.071 0l-1.414-1.414M7.172 7.172L5.758 5.758M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { day: "Vi", tempMin: 17, tempMax: 22, type: "sunny",    icon: "M12 3v2m0 14v2m9-9h-2M5 12H3m16.243-6.243l-1.414 1.414M7.172 16.828l-1.414 1.414m12.071 0l-1.414-1.414M7.172 7.172L5.758 5.758M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { day: "Sá", tempMin: 17, tempMax: 25, type: "sunny",    icon: "M12 3v2m0 14v2m9-9h-2M5 12H3m16.243-6.243l-1.414 1.414M7.172 16.828l-1.414 1.414m12.071 0l-1.414-1.414M7.172 7.172L5.758 5.758M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
];

function getWeatherIcon(type: string) {
    switch (type) {
        case "sunny":
            return <Sun size={30} />;
        case "cloudy":
            return <Cloud size={30} />;
        case "rain":
            return <CloudRain size={30} />;
        case "thunder":
            return <CloudLightning size={30} />;
        default:
            return <Sun size={30} />;
    }
}

export function WeatherMenu() {
    return (
        <div
            class="absolute bottom-24 left-8 z-40 w-full max-w-2xl text-white rounded-3xl p-6 shadow-2xl border border-gray-800/60 animate-fade-in"
            style="background-color: #1B181A;"
        >
            {/* Encabezado en Fira Code */}
            <h3 class="text-2xl font-fira text-center font-semibold mb-6 tracking-wide">
                Clima - Amecameca, Edo Mex. México
            </h3>

            {/* Grid de los 7 días */}
            <div class="grid grid-cols-7 gap-2 text-center font-work">
                <For each={WEATHER_DATA}>
                    {(item) => (
                        <div class="flex flex-col items-center space-y-4">
                            {/* Día de la semana */}
                            <span class="text-xl font-semibold text-gray-200">{item.day}</span>

                            {/* Contenedor dinamico de Íconos SVG segun el tipo de clima */}
                            <div class="text-lucy-primary w-10 h-10 flex items-center justify-center">
                                {getWeatherIcon(item.type)}
                            </div>

                            <div class="font-fira text-xs space-x-1 whitespace-nowrap">
                                <span class="text-gray-400">{item.tempMin}°</span>
                                <span class="text-white font-bold">{item.tempMax}°</span>
                            </div>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
}