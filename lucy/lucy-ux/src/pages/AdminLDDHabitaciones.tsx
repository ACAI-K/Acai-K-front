import { createSignal, For } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { LucyButton, LucyIconButton } from "../components/LucyButton";
import ChevronRight from "lucide-solid/icons/chevron-right";
import Plus from "lucide-solid/icons/plus";

type Habitacion = {
    id: string;
    nombre: string;
    descripcion: string;
    maxPersonas: number;
    camas: number;
    precio: number;
};

const HABITACIONES_MOCK: Habitacion[] = [
    {
        id: "1",
        nombre: "Cabaña Junior",
        descripcion: "Una acogedora cabaña en el bosque lista para recibir a ti y a tu familia pequeña con una cama matrimonial, esta espaciada con una cocineta y baño completo, todos para que disfrutes un especial en las montañas.",
        maxPersonas: 2,
        camas: 1,
        precio: 999.99,
    },
    {
        id: "2",
        nombre: "Cabaña Deluxe",
        descripcion: "Una gran cabaña con una increíble vista al bosque y con todo lo que tu familia necesita. La Cabaña Deluxe cuenta con dos cuartos, una cama matrimonial y dos individuales, cocina, comedor y una zona para relajarse, preparada para unas vacaciones en familia.",
        maxPersonas: 4,
        camas: 2,
        precio: 1999.99,
    },
];

export default function AdminLDDHabitaciones() {
    const navigate = useNavigate();
    const [habitaciones, setHabitaciones] = createSignal<Habitacion[]>(HABITACIONES_MOCK);

    return (
        <div class="h-screen text-lucy-light flex flex-col mt-8 mx-auto w-[70dvw]">
            <h1 class="text-lucy-light text-4xl md:text-5xl font-bold font-fira">
                Habitaciones
            </h1>

            {/* Contenido Principal */}
            <main class="max-w-6xl mx-auto p-8">
                {/* Grid de Habitaciones */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <For each={habitaciones()}>
                        {(habitacion) => (
                            <div class="bg-lucy-dark border border-lucy-light/20 rounded-sm overflow-hidden shadow-lg hover:border-lucy-light/40 transition-colors">
                                {/* Imagen Placeholder */}
                                <div class="w-full h-40 bg-lucy-light/5 border-b border-lucy-light/20 flex items-center justify-center relative overflow-hidden">
                                    <svg class="w-full h-full opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <button class="absolute top-3 right-3 bg-lucy-secondary text-lucy-dark p-2 rounded-full hover:bg-lucy-secondary/80 transition-colors shadow-lg">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Contenido */}
                                <div class="p-6 space-y-4">
                                    {/* Nombre */}
                                    <h3 class="text-lucy-light text-xl font-fira font-bold">
                                        {habitacion.nombre}
                                    </h3>

                                    {/* Descripción */}
                                    <p class="text-lucy-light/70 text-sm font-work leading-relaxed">
                                        {habitacion.descripcion}
                                    </p>

                                    {/* Info: Personas y Camas */}
                                    <div class="flex gap-6 text-lucy-light text-sm font-work">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12a3 3 0 100-6 3 3 0 000 6zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
                                            </svg>
                                            <span>Max. {habitacion.maxPersonas}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M5 13a3 3 0 106 0V7a1 1 0 012 0v6a3 3 0 10-6 0v-6a1 1 0 012 0v6z" />
                                            </svg>
                                            <span>{habitacion.camas} Cama{habitacion.camas > 1 ? 's' : ''}</span>
                                        </div>
                                    </div>

                                    {/* Precio */}
                                    <div class="pt-4 border-t border-lucy-light/10">
                                        <p class="text-lucy-secondary text-lg font-fira font-bold">
                                            ${habitacion.precio.toFixed(2)} <span class="text-lucy-light/50 text-sm">MXN por noche</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>

                {/* Botón para Agregar Habitación */}
                <LucyIconButton ButtonLink="/admin-ldd/crear-habitacion" ButtonBackground="lucy-secondary" ButtonForeground="lucy-dark" ButtonSize="lg" ButtonIcon={<Plus size={20}/>} class="my-4 w-fit mx-auto" ButtonText="Agregar Habitación"/>

                {/* Botón Confirmar */}
                <LucyButton ButtonLink="/admin-ldd" ButtonText="Volver al Menú" ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ChevronRight size={30}/>} class="mx-auto my-4 w-fit" />
            </main>
        </div>
    );
}
