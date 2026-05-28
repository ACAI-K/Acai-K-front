import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function ConfirmacionReserva() {
    const navigate = useNavigate();
    const [copiado, setCopiado] = createSignal(false);

    // Mock data
    const codigoConfirmacion = "ABC1-DEF2-HIJ3";
    const emailConfirmacion = "karlarga@mail.com";

    const copiarCodigo = () => {
        navigator.clipboard.writeText(codigoConfirmacion);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div class="min-h-screen bg-lucy-dark flex items-center justify-center p-8">
            <div class="max-w-md w-full text-center space-y-8">
                {/* Ícono de Confirmación */}
                <div class="flex justify-center">
                    <div class="relative w-24 h-24">
                        <svg
                            class="w-24 h-24 text-lucy-light animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" stroke-width="2" />
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="3"
                                d="M9 12l2 2 4-4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Título */}
                <div class="space-y-2">
                    <h1 class="text-lucy-light text-3xl md:text-4xl font-fira font-bold">
                        ¡Reserva confirmada!
                    </h1>
                </div>

                {/* Código de Confirmación */}
                <div class="space-y-4 bg-lucy-light/10 border border-lucy-light/20 rounded-lg p-8">
                    <p class="text-lucy-light/70 text-sm font-work">
                        Código de confirmación
                    </p>
                    <div class="flex items-center justify-center gap-3">
                        <code class="text-lucy-light text-2xl font-fira font-bold tracking-widest">
                            {codigoConfirmacion}
                        </code>
                        <button
                            onClick={copiarCodigo}
                            class="text-lucy-light/60 hover:text-lucy-secondary transition-colors"
                            title="Copiar código"
                        >
                            {copiado() ? (
                                <svg class="w-5 h-5 text-lucy-light" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            ) : (
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Email de Confirmación */}
                <div class="flex flex-col items-center gap-3">
                    <svg class="w-5 h-5 text-lucy-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    <div class="text-lucy-light/70 font-work text-sm">
                        <p>Código de confirmación enviado a:</p>
                        <p class="text-lucy-light font-semibold mt-1">
                            {emailConfirmacion}
                        </p>
                    </div>
                </div>

                {/* Detalles de la Reserva */}
                <div class="bg-lucy-light/5 border border-lucy-light/10 rounded-lg p-6 space-y-3 text-left">
                    <div class="flex justify-between">
                        <span class="text-lucy-light/60 text-sm">Lugar:</span>
                        <span class="text-lucy-light font-work">Cabaña El Abuelo</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-lucy-light/60 text-sm">Habitación:</span>
                        <span class="text-lucy-light font-work">Cabaña Deluxe</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-lucy-light/60 text-sm">Fechas:</span>
                        <span class="text-lucy-light font-work">5 - 10 Jun 2026</span>
                    </div>
                    <div class="border-t border-lucy-light/10 pt-3 mt-3 flex justify-between">
                        <span class="text-lucy-light/60 text-sm">Total pagado:</span>
                        <span class="text-lucy-light font-fira font-bold">$20,999.86 MXN</span>
                    </div>
                </div>

                {/* Botones */}
                <div class="space-y-4 pt-4">
                    <button
                        onClick={() => navigate("/")}
                        class="w-full inline-flex items-center justify-center gap-2 bg-lucy-secondary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary/80 transition-colors shadow-lg"
                    >
                        Volver a Inicio
                    </button>

                    <button class="w-full text-lucy-secondary font-work text-sm hover:text-lucy-secondary/80 transition-colors">
                        ¿Necesitas ayuda?
                    </button>
                </div>

                {/* Mensaje informativo */}
                <p class="text-lucy-light/40 text-xs font-work mt-8">
                    Revisa tu correo para más detalles sobre tu reserva. 
                    <br />
                    Si no ves el email, revisa tu carpeta de spam.
                </p>
            </div>
        </div>
    );
}
