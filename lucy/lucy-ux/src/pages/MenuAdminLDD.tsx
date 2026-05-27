import { A } from "@solidjs/router";

export default function MenuAdminLDD() {
    const nombreHotel = "Pambacito Delux"; // Este valor podría venir de parámetros o estado

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
                    <h1 class="text-lucy-dark text-2xl md:text-3xl font-work font-semibold">
                        Hola administrador de:
                    </h1>
                    <p class="text-lucy-dark text-2xl md:text-3xl font-fira font-bold mt-2">
                        Hotel "{nombreHotel}"
                    </p>
                </div>
            </header>

            {/* Menú Principal */}
            <main class="max-w-2xl mx-auto p-8">
                <div class="space-y-6">
                    {/* Opción: Habitaciones */}
                    <A
                        href="/admin-ldd/habitaciones"
                        class="block bg-lucy-dark text-lucy-light px-8 py-4 rounded-full font-fira font-bold text-xl hover:bg-lucy-primary hover:text-lucy-dark transition-colors shadow-lg border border-lucy-light/20 hover:border-lucy-primary flex items-center justify-between group"
                    >
                        <span>Habitaciones</span>
                        <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </A>

                    {/* Opción: Reservas */}
                    <A
                        href="/admin-ldd/reservas"
                        class="block bg-lucy-dark text-lucy-light px-8 py-4 rounded-full font-fira font-bold text-xl hover:bg-lucy-primary hover:text-lucy-dark transition-colors shadow-lg border border-lucy-light/20 hover:border-lucy-primary flex items-center justify-between group"
                    >
                        <span>Reservas</span>
                        <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </A>

                    {/* Opción: Editar */}
                    <A
                        href="/admin-ldd/editar"
                        class="block bg-lucy-dark text-lucy-light px-8 py-4 rounded-full font-fira font-bold text-xl hover:bg-lucy-primary hover:text-lucy-dark transition-colors shadow-lg border border-lucy-light/20 hover:border-lucy-primary flex items-center justify-between group"
                    >
                        <span>Editar</span>
                        <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </A>
                </div>
            </main>
        </div>
    );
}
