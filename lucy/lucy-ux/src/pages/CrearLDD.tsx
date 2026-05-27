import { createSignal } from "solid-js";
import { 
    Wifi, 
    CircleParking, 
    Dumbbell, 
    Coffee, 
    Accessibility, 
    WashingMachine, 
    Baby, 
    Waves, 
    UtensilsCrossed, 
    PawPrint, 
    Flower2, 
    Fan 
} from "lucide-solid";

type LugarType = "hotel" | "cabana" | "campamento" | "casa";

type Amenidad = {
    id: string;
    nombre: string;
    icono: (props: any) => any;
    selected: boolean;
};

// Arreglo mucho más limpio usando los componentes de Lucide directamente
const AMENIDADES_DISPONIBLES: Amenidad[] = [
    { id: "wifi", nombre: "WiFi", icono: Wifi, selected: false },
    { id: "estacionamiento", nombre: "Estacionamiento", icono: CircleParking, selected: false },
    { id: "gym", nombre: "GYM", icono: Dumbbell, selected: false },
    { id: "desayuno", nombre: "Desayuno Incluido", icono: Coffee, selected: false },
    { id: "accesibilidad", nombre: "Accesibilidad", icono: Accessibility, selected: false },
    { id: "lavanderia", nombre: "Servicio de Lavandería", icono: WashingMachine, selected: false },
    { id: "guarderia", nombre: "Guardería", icono: Baby, selected: false },
    { id: "alberca", nombre: "Alberca", icono: Waves, selected: false },
    { id: "restaurante", nombre: "Restaurante", icono: UtensilsCrossed, selected: false },
    { id: "petfriendly", nombre: "Pet-friendly", icono: PawPrint, selected: false },
    { id: "spa", nombre: "SPA", icono: Flower2, selected: false },
    { id: "aire", nombre: "Aire Acondicionado", icono: Fan, selected: false },
];

export default function CrearLDD() {
    const [nombre, setNombre] = createSignal("");
    const [tipoLugar, setTipoLugar] = createSignal<LugarType>("hotel");
    const [amenidades, setAmenidades] = createSignal<Amenidad[]>(AMENIDADES_DISPONIBLES);
    const [telefono, setTelefono] = createSignal("");
    const [paginaWeb, setPaginaWeb] = createSignal("");

    const toggleAmenidad = (id: string) => {
        setAmenidades((prev) =>
            prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
        );
    };

    return (
        <div class="min-h-screen bg-lucy-dark">
            {/* Header */}
            <header class="bg-lucy-primary relative overflow-hidden">
                <div class="absolute inset-0 opacity-20 pointer-events-none">
                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" stroke-width="2" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" stroke-width="2" />
                    </svg>
                </div>

                <div class="max-w-6xl mx-auto p-8 pt-12 pb-16 relative z-10">
                    <h1 class="text-lucy-dark text-4xl md:text-5xl font-bold font-fira">
                        Registrar Lugar
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-6xl mx-auto p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Formulario Izquierda */}
                    <div class="space-y-6">
                        {/* Campo Nombre */}
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre()}
                                onInput={(e) => setNombre(e.currentTarget.value)}
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-sm text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                            />
                        </div>

                        {/* Selección de Tipo de Lugar */}
                        <div>
                            <p class="text-lucy-light text-sm font-fira mb-3 opacity-70">
                                Selecciona el tipo de lugar
                            </p>
                            <div class="flex flex-wrap gap-3">
                                {(
                                    [
                                        { value: "hotel" as LugarType, label: "Hotel" },
                                        { value: "cabana" as LugarType, label: "Cabaña" },
                                        { value: "campamento" as LugarType, label: "Campamento" },
                                        { value: "casa" as LugarType, label: "Casa" },
                                    ] as const
                                ).map((tipo) => (
                                    <button
                                        onClick={() => setTipoLugar(tipo.value)}
                                        class={`px-4 py-2 rounded-full font-fira text-sm font-semibold transition-colors ${
                                            tipoLugar() === tipo.value
                                                ? "bg-lucy-secondary text-lucy-dark"
                                                : "bg-lucy-light/10 text-lucy-light hover:bg-lucy-light/20"
                                        }`}
                                    >
                                        {tipo.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Amenidades */}
                        <div>
                            <p class="text-lucy-light text-sm font-fira mb-3 opacity-70">
                                Selecciona las amenidades con las que cuenta tu lugar
                            </p>
                            <div class="grid grid-cols-4 gap-2">
                                {amenidades().map((amenidad) => (
                                    <button
                                        onClick={() => toggleAmenidad(amenidad.id)}
                                        class={`flex flex-col items-center justify-center gap-2 p-3 rounded-sm transition-colors ${
                                            amenidad.selected
                                                ? "bg-lucy-secondary/20 border-2 border-lucy-secondary text-lucy-secondary"
                                                : "bg-lucy-light/5 border-2 border-lucy-light/20 text-lucy-light hover:border-lucy-light/40"
                                        }`}
                                    >
                                        {/* Aquí pasamos las clases de Tailwind directamente al componente del ícono */}
                                        <amenidad.icono class="w-6 h-6" />
                                        <span class="text-xs text-center font-work leading-tight">
                                            {amenidad.nombre}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Botón Crear */}
                        <button class="w-full bg-lucy-primary text-lucy-dark px-6 py-3 rounded-full font-fira font-bold text-base hover:bg-lucy-secondary transition-colors shadow-lg shadow-lucy-primary/20 mt-8">
                            Crear
                        </button>
                    </div>

                    {/* Derecha: Mapa y campos opcionales */}
                    <div class="space-y-4 flex flex-col">
                        {/* Campos Opcionales */}
                        <div class="space-y-3">
                            <input
                                type="tel"
                                placeholder="Teléfono (opcional)"
                                value={telefono()}
                                onInput={(e) => setTelefono(e.currentTarget.value)}
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-sm text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                            />
                            <input
                                type="url"
                                placeholder="Página web (opcional)"
                                value={paginaWeb()}
                                onInput={(e) => setPaginaWeb(e.currentTarget.value)}
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-sm text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                            />
                        </div>

                        {/* Mini Mapa Placeholder */}
                        <div class="flex-grow rounded-sm overflow-hidden shadow-lg bg-lucy-light/10 border-2 border-lucy-light/20 flex items-center justify-center">
                            <div class="text-lucy-light/50 text-center">
                                <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7.71v12.29zm0 0l6-3.446m0 0l5.447-2.724A1 1 0 0021 7.618v10.764a1 1 0 01-1.553.894L15 12.29m0 0l-6 3.446m6-3.446v6.29m0-6.29l6-3.446" />
                                </svg>
                                <p class="text-sm font-fira">Mapa</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}