import { createSignal, For } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

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
                    <div class="flex items-center justify-between mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            class="text-lucy-dark hover:opacity-70 transition-opacity"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button class="text-lucy-dark hover:opacity-70 transition-opacity">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <h1 class="text-lucy-dark text-4xl md:text-5xl font-bold font-fira">
                        Habitaciones
                    </h1>
                </div>
            </header>

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
                <div class="flex justify-center mb-8">
                    <button
                        onClick={() => navigate("/admin-ldd/crear-habitacion")}
                        class="w-16 h-16 bg-lucy-secondary text-lucy-dark rounded-full flex items-center justify-center hover:bg-lucy-secondary/80 transition-colors shadow-lg hover:shadow-xl transform hover:scale-110"
                    >
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>

                {/* Botón Confirmar */}
                <div class="flex justify-center">
                    <button
                        onClick={() => navigate("/admin-ldd")}
                        class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary transition-colors shadow-lg"
                    >
                        Confirmar
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </main>
        </div>
    );
}
