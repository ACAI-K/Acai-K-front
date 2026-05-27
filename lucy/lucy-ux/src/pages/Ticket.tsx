import { createSignal } from "solid-js";
import { A } from "@solidjs/router";

export default function Ticket() {
    const [respuesta, setRespuesta] = createSignal("");

    // Datos del ticket (podrían venir de parámetros)
    const numeroTicket = 105;
    const estado = "Abierto";
    const asunto = "No me llegó mi correo de confirmación help T-T :C ayuda";
    const email = "rondsam@lchavo.mx";

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
                    <div class="flex items-center gap-4">
                        <A href="/admin/tickets" class="text-lucy-dark hover:opacity-70 transition-opacity">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </A>
                        <div>
                            <h1 class="text-lucy-dark text-3xl md:text-4xl font-bold font-fira">
                                Ticket #{numeroTicket} - {estado}
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-4xl mx-auto p-8">
                <div class="space-y-8">
                    {/* Info del Ticket */}
                    <div class="bg-lucy-light/5 border border-lucy-light/20 rounded-lg p-8 space-y-6">
                        {/* Asunto */}
                        <div>
                            <h2 class="text-lucy-light text-2xl font-work font-semibold">
                                {asunto}
                            </h2>
                        </div>

                        {/* Email */}
                        <div>
                            <p class="text-lucy-light/70 text-sm font-fira mb-2">Email del usuario:</p>
                            <p class="text-lucy-light font-work text-base">
                                {email}
                            </p>
                        </div>

                        {/* Mensaje inicial */}
                        <div class="pt-6 border-t border-lucy-light/20">
                            <p class="text-lucy-light/70 text-sm font-fira mb-4">Mensaje:</p>
                            <div class="bg-lucy-dark border border-lucy-light/10 rounded p-6 space-y-4">
                                <p class="text-lucy-light font-work">
                                    Chebo.
                                </p>
                                <p class="text-lucy-light/80 font-work text-sm leading-relaxed">
                                    No me llegó mi correo de confirmación.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Respuesta del Soporte */}
                    <div class="bg-lucy-light/10 border border-lucy-light/20 rounded-lg p-8">
                        <p class="text-lucy-light/70 text-sm font-fira mb-4">Respuesta de Soporte:</p>
                        <div class="bg-lucy-light text-lucy-dark rounded p-8 space-y-4">
                            <h3 class="text-lg font-fira font-bold">
                                ¡Buenas tardes! Ayuda Soporte
                            </h3>
                            <p class="font-work text-sm leading-relaxed">
                                Entiendo su enojo y preocupación respecto al correo con el código de confirmación de su cuenta. Le agradezco la paciencia. Realmente es importante confirmar el correo para poder acceder a la plataforma. En caso que no lo encuentre ahí, por favor, contacte de nuevo y soporte. Al abrir el correo habrá un espacio para confirmar a esta empresa. Coloque el código que le enviamos al terminar el proceso de reserva, si no cuenta con él, por favor translabe la fecha aproximada de la compra y datos fijos la reserva.
                            </p>
                            <p class="font-fira text-xs text-lucy-dark/60">
                                - Lucy - Equipo de Soporte técnico
                            </p>
                        </div>
                    </div>

                    {/* Área de Respuesta */}
                    <div>
                        <label class="text-lucy-light/70 text-sm font-fira mb-3 block">
                            Tu respuesta:
                        </label>
                        <textarea
                            value={respuesta()}
                            onInput={(e) => setRespuesta(e.currentTarget.value)}
                            placeholder="Escribe tu mensaje aquí..."
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-4 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary resize-none h-32 font-work"
                        >
                        </textarea>
                    </div>

                    {/* Botón Enviar */}
                    <div class="flex justify-center">
                        <button class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary transition-colors shadow-lg">
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
