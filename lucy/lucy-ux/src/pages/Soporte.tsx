import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function Soporte() {
    const navigate = useNavigate();
    const [email, setEmail] = createSignal("");
    const [titulo, setTitulo] = createSignal("");
    const [descripcion, setDescripcion] = createSignal("");

    const maxDescripcion = 350;

    const handleEnviar = () => {
        // Validar campos
        if (!email() || !titulo() || !descripcion()) {
            alert("Por favor completa todos los campos");
            return;
        }
        // Aquí iría la lógica para enviar el ticket de soporte
        console.log({
            email: email(),
            titulo: titulo(),
            descripcion: descripcion(),
        });
        // Redirigir a confirmación o página de éxito
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
                        Soporte
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-2xl mx-auto p-8">
                <div class="space-y-6">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-4 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Título */}
                    <div>
                        <input
                            type="text"
                            placeholder="Titulo"
                            value={titulo()}
                            onInput={(e) => setTitulo(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-4 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <div class="relative">
                            <textarea
                                placeholder="Descripción del problema"
                                value={descripcion()}
                                onInput={(e) => setDescripcion(e.currentTarget.value.slice(0, maxDescripcion))}
                                class="w-full bg-lucy-light text-lucy-dark px-6 py-4 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work resize-none h-32"
                            />
                            <span class="absolute bottom-3 right-6 text-lucy-dark/50 text-xs font-work">
                                {descripcion().length}/{maxDescripcion}
                            </span>
                        </div>
                    </div>

                    {/* Botón Enviar */}
                    <div class="flex justify-center pt-6">
                        <button
                            onClick={handleEnviar}
                            class="inline-flex items-center gap-2 bg-lucy-secondary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary/80 transition-colors shadow-lg"
                        >
                            Enviar
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
