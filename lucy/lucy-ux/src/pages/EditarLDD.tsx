import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
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
    Fan, 
    ChevronRight
} from "lucide-solid";
import { LucyButton } from "../components/LucyButton";

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

export default function EditarLDD() {
    const navigate = useNavigate();
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
        <div class="h-screen text-lucy-light flex flex-col mt-8 mx-auto w-[70dvw]">
            <h1 class="text-lucy-light text-4xl md:text-5xl font-bold font-fira">
                Editar "Hotel De Lux"
            </h1>

            {/* Contenido Principal */}
            <main class="max-w-6xl mx-auto p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Formulario Izquierda */}
                    <div class="space-y-6">
                        {/* Campo Nombre */}
                        <div>
                            <input
                                type="text"
                                placeholder="Hotel De Lux"
                                value={nombre()}
                                onInput={(e) => setNombre(e.currentTarget.value)}
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-sm text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary rounded-br-4xl rounded-tl-4xl"
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
                                        class={`py-2 rounded-full font-fira text-sm font-semibold transition-colors rounded-bl-4xl rounded-tr-4xl px-6 ${
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
                                        class={`flex flex-col items-center justify-center gap-2 p-3 rounded-sm transition-colors rounded-br-4xl rounded-tl-4xl ${
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
                        <LucyButton
                            ButtonLink="/admin-ldd"
                            ButtonText="Guardar Cambios"
                            ButtonBackground="lucy-primary"
                            ButtonForeground="lucy-dark"
                            ButtonSize="lg"
                            ButtonIconSide="right"
                            ButtonIcon={<ChevronRight size={30} />}
                            class="mx-auto mt-6 w-fit rounded-br-4xl rounded-tl-4xl"
                        />
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
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-sm text-base placeholder-lucy-dark/60 rounded-br-4xl rounded-tl-4xl focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                            />
                            <input
                                type="url"
                                placeholder="Página web (opcional)"
                                value={paginaWeb()}
                                onInput={(e) => setPaginaWeb(e.currentTarget.value)}
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-sm text-base placeholder-lucy-dark/60 rounded-br-4xl rounded-tl-4xl focus:outline-none focus:ring-2 focus:ring-lucy-primary"
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