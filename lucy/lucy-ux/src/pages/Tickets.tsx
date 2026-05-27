import { For } from "solid-js";

type Ticket = {
    id: number;
    asunto: string;
    estado: "Abierto" | "Esperando respuesta" | "Cerrado";
};

const TICKETS_MOCK: Ticket[] = [
    {
        id: 105,
        asunto: "No me llegó mi correo de confirmación help T-T :C ayuda",
        estado: "Abierto",
    },
    {
        id: 106,
        asunto: "El correo registrado para mi hotel no es correcto",
        estado: "Esperando respuesta",
    },
    {
        id: 106,
        asunto: "¿Cómo me registro? Soy dueño de las prestigiosas cabañas ...",
        estado: "Abierto",
    },
    {
        id: 107,
        asunto: "@LK57E7s",
        estado: "Cerrado",
    },
];

const getEstadoColor = (estado: string) => {
    switch (estado) {
        case "Abierto":
            return "bg-lucy-secondary/20 text-lucy-secondary";
        case "Esperando respuesta":
            return "bg-lucy-secondary/20 text-lucy-secondary";
        case "Cerrado":
            return "bg-lucy-light/10 text-lucy-light/50";
        default:
            return "bg-lucy-light/10 text-lucy-light";
    }
};

export default function Tickets() {
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
                        Tickets
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-4xl mx-auto p-8">
                <div class="space-y-4">
                    <For each={TICKETS_MOCK}>
                        {(ticket) => (
                            <div class="bg-lucy-light/10 border border-lucy-light/20 rounded-lg p-6 hover:border-lucy-light/40 transition-colors cursor-pointer group">
                                <div class="flex items-start justify-between gap-4">
                                    {/* Contenido del ticket */}
                                    <div class="flex-1 space-y-2 group-hover:text-lucy-primary transition-colors">
                                        <p class="text-lucy-light font-work text-base">
                                            {ticket.asunto}
                                        </p>
                                        <div class="flex items-center gap-3">
                                            <span class="text-lucy-light/50 font-fira text-sm">
                                                #{ticket.id}
                                            </span>
                                            <span class={`text-xs font-fira font-semibold px-3 py-1 rounded-full ${getEstadoColor(ticket.estado)}`}>
                                                {ticket.estado}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Icono de flecha */}
                                    <svg class="w-5 h-5 text-lucy-light/50 group-hover:text-lucy-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
            </main>
        </div>
    );
}
