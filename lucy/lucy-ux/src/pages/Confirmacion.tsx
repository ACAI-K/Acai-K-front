import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { LucyButton } from "../components/LucyButton";
import CheckCircle from "lucide-solid/icons/check-circle";
import MailCheck from "lucide-solid/icons/mail-check";
import Copy from "lucide-solid/icons/copy";
import Check from "lucide-solid/icons/check";

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
        <div class="w-full h-full flex flex-col items-center justify-center">
            <div class="flex flex-col items-center gap-8 max-w-md w-full text-center">
                {/* Ícono de Confirmación */}
                <CheckCircle class="w-24 h-24 lg:w-36 lg:h-36 text-lucy-success" />

                {/* Título */}
                <h1 class="text-lucy-light text-3xl md:text-4xl font-fira font-bold">
                    ¡Reserva confirmada!
                </h1>

                {/* Código de Confirmación */}
                <div class="space-y-4 bg-lucy-light/10 border border-lucy-light/20 rounded-lg px-8 py-4 lg:px-12 lg:py-6 rounded-br-4xl rounded-tl-4xl">
                    <p class="text-lucy-light text-sm font-work lg:text-base">
                        Código de confirmación
                    </p>
                    <div class="flex items-center justify-center gap-3">
                        <code class="text-lucy-light text-2xl font-fira font-bold tracking-widest">
                            {codigoConfirmacion}
                        </code>
                        <button
                            onClick={copiarCodigo}
                            class="text-lucy-light hover:text-lucy-secondary transition-colors"
                            title="Copiar código"
                        >
                            {copiado() ? (
                                <Check class="w-7 h-7" />
                            ) : (
                                <Copy class="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Email de Confirmación */}
                <div class="flex justify-center items-center gap-4 ">
                    <MailCheck class="w-8 h-8 text-lucy-light" />
                    <div class="text-lucy-light/70 font-work text-sm">
                        <p>Código de confirmación enviado a:</p>
                        <p class="text-lucy-light font-semibold">
                            {emailConfirmacion}
                        </p>
                    </div>
                </div>

                {/* Detalles de la Reserva */}
                <div class="bg-lucy-light/5 border border-lucy-light/10 rounded-lg p-6 space-y-3 text-left rounded-br-4xl rounded-tl-4xl hidden sm:block flex flex-col w-full">
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
                </div>

                {/* Botones */}
                <div class="space-y-4 pt-4">
                    <LucyButton ButtonBackground="lucy-secondary" ButtonText="Volver al Inicio" ButtonForeground="lucy-dark" ButtonSize="md" ButtonIconSide="right" ButtonLink="/" ButtonIcon={""} class="w-full" />

                    <button class="w-full text-lucy-secondary font-work text-sm hover:text-lucy-secondary/80 transition-colors">
                        ¿Necesitas ayuda?
                    </button>
                </div>

                {/* Mensaje informativo */}
                <p class="text-lucy-light/40 text-xs font-work my-8">
                    Revisa tu correo para más detalles sobre tu reserva. 
                    <br />
                    Si no ves el email, revisa tu carpeta de spam.
                </p>
            </div>
        </div>
    );
}