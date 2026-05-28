import { useParams, useNavigate } from "@solidjs/router";
import { For } from "solid-js";

type Habitacion = {
    id: string;
    nombre: string;
    personas: number;
    camas: number;
    precio: number;
    imagen: string;
};

const HABITACIONES_MOCK: Habitacion[] = [
    {
        id: "1",
        nombre: "Cabaña Junior",
        personas: 2,
        camas: 1,
        precio: 999.99,
        imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60",
    },
    {
        id: "2",
        nombre: "Cabaña Deluxe",
        personas: 4,
        camas: 2,
        precio: 1999.99,
        imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60",
    },
    {
        id: "3",
        nombre: "Cabaña Premium",
        personas: 6,
        camas: 3,
        precio: 2999.99,
        imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60",
    },
    {
        id: "4",
        nombre: "Cabaña Royal",
        personas: 8,
        camas: 4,
        precio: 3999.99,
        imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=500&q=60",
    },
];

export default function LugarHabitaciones() {
    const navigate = useNavigate();
    const params = useParams();
    
    // Aquí iría la lógica para obtener el nombre del lugar desde params.id
    const nombreLugar = "El Abuelo";

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
                    <h1 class="text-lucy-dark text-3xl md:text-4xl font-bold font-fira">
                        Cabañas "{nombreLugar}"
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-6xl mx-auto p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <For each={HABITACIONES_MOCK}>
                        {(habitacion) => (
                            <div class="bg-lucy-dark border border-lucy-light/20 rounded-lg overflow-hidden shadow-lg hover:border-lucy-light/40 transition-colors">
                                {/* Imagen */}
                                <div class="w-full h-48 bg-lucy-light/5 border-b border-lucy-light/20 flex items-center justify-center relative overflow-hidden">
                                    <img
                                        src={habitacion.imagen}
                                        alt={habitacion.nombre}
                                        class="w-full h-full object-cover"
                                        onError={(e) => {
                                            const img = e.currentTarget as HTMLImageElement;
                                            img.style.display = "none";
                                        }}
                                    />
                                    <svg class="w-full h-full opacity-20 absolute" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>

                                {/* Contenido */}
                                <div class="p-6 space-y-4">
                                    {/* Nombre */}
                                    <h3 class="text-lucy-light text-xl font-fira font-bold">
                                        {habitacion.nombre}
                                    </h3>

                                    {/* Info: Personas y Camas */}
                                    <div class="flex gap-6 text-lucy-light text-sm font-work">
                                        <div class="flex items-center gap-2">
                                            <svg class="w-5 h-5 text-lucy-secondary" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12a3 3 0 100-6 3 3 0 000 6zM12 14a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
                                            </svg>
                                            <span class="text-lucy-light/80">Máx. {habitacion.personas}</span>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <svg class="w-5 h-5 text-lucy-secondary" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M5 13a3 3 0 106 0V7a1 1 0 012 0v6a3 3 0 10-6 0v-6a1 1 0 012 0v6z" />
                                            </svg>
                                            <span class="text-lucy-light/80">{habitacion.camas} Cama{habitacion.camas > 1 ? "s" : ""}</span>
                                        </div>
                                    </div>

                                    {/* Separador */}
                                    <div class="pt-4 border-t border-lucy-light/10 space-y-4">
                                        {/* Precio */}
                                        <div>
                                            <p class="text-lucy-secondary text-2xl font-fira font-bold">
                                                ${habitacion.precio.toFixed(2)}
                                                <span class="text-lucy-light/50 text-sm ml-1">MXN por noche</span>
                                            </p>
                                        </div>

                                        {/* Botón Reservar */}
                                        <button class="w-full inline-flex items-center justify-center gap-2 bg-lucy-secondary text-lucy-dark px-6 py-2 rounded-full font-fira font-bold hover:bg-lucy-secondary/80 transition-colors shadow-lg">
                                            Reserva ahora
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </main>
        </div>
    );
}
