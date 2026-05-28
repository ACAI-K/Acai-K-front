import { createSignal } from "solid-js";
import { useNavigate, A } from "@solidjs/router";

type MetodoPago = "paypal" | "tarjeta" | "amex" | "discover" | "mastercard" | "visa" | "mercadopago";

export default function Pago() {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = createSignal<MetodoPago>("tarjeta");
    const [nombreTitular, setNombreTitular] = createSignal("");
    const [numeroTarjeta, setNumeroTarjeta] = createSignal("");
    const [mes, setMes] = createSignal("");
    const [ano, setAno] = createSignal("");
    const [cvv, setCvv] = createSignal("");

    const total = 20999.86;

    const formatNumeroTarjeta = (value: string) => {
        const cleaned = value.replace(/\D/g, "").slice(0, 16);
        return cleaned.replace(/(.{4})/g, "$1 ").trim();
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
                        Métodos de Pago
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-6xl mx-auto p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Lado Izquierdo: Métodos de Pago */}
                    <div class="space-y-6">
                        <h2 class="text-lucy-light text-2xl font-fira font-bold mb-8">
                            Ingresa método de pago
                        </h2>
                        <p class="text-lucy-light/60 text-sm font-work mb-6">
                            Selecciona uno de nuestros métodos disponibles
                        </p>

                        {/* PayPal */}
                        <button
                            onClick={() => setMetodoPago("paypal")}
                            class={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                                metodoPago() === "paypal"
                                    ? "border-lucy-secondary bg-lucy-secondary/10"
                                    : "border-lucy-light/20 hover:border-lucy-light/40"
                            }`}
                        >
                            <svg class="w-24 h-12" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <text x="10" y="25" font-size="20" font-weight="bold" fill="#003087">
                                    Pay
                                </text>
                                <text x="45" y="25" font-size="20" font-weight="bold" fill="#009cde">
                                    Pal
                                </text>
                            </svg>
                        </button>

                        {/* Tarjetas de Crédito */}
                        <div class="grid grid-cols-2 gap-4">
                            {/* AMEX */}
                            <button
                                onClick={() => setMetodoPago("amex")}
                                class={`p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                                    metodoPago() === "amex"
                                        ? "border-lucy-secondary bg-lucy-secondary/10"
                                        : "border-lucy-light/20 hover:border-lucy-light/40"
                                }`}
                            >
                                <span class="text-blue-600 font-bold text-sm">AMEX</span>
                            </button>

                            {/* Discover */}
                            <button
                                onClick={() => setMetodoPago("discover")}
                                class={`p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                                    metodoPago() === "discover"
                                        ? "border-lucy-secondary bg-lucy-secondary/10"
                                        : "border-lucy-light/20 hover:border-lucy-light/40"
                                }`}
                            >
                                <span class="text-orange-600 font-bold text-sm">DISCOVER</span>
                            </button>

                            {/* Mastercard */}
                            <button
                                onClick={() => setMetodoPago("mastercard")}
                                class={`p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                                    metodoPago() === "mastercard"
                                        ? "border-lucy-secondary bg-lucy-secondary/10"
                                        : "border-lucy-light/20 hover:border-lucy-light/40"
                                }`}
                            >
                                <span class="text-red-600 font-bold text-sm">MASTERCARD</span>
                            </button>

                            {/* VISA */}
                            <button
                                onClick={() => setMetodoPago("visa")}
                                class={`p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                                    metodoPago() === "visa"
                                        ? "border-lucy-secondary bg-lucy-secondary/10"
                                        : "border-lucy-light/20 hover:border-lucy-light/40"
                                }`}
                            >
                                <span class="text-blue-700 font-bold text-sm">VISA</span>
                            </button>
                        </div>

                        {/* Mercado Pago */}
                        <button
                            onClick={() => setMetodoPago("mercadopago")}
                            class={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-center ${
                                metodoPago() === "mercadopago"
                                    ? "border-lucy-secondary bg-lucy-secondary/10"
                                    : "border-lucy-light/20 hover:border-lucy-light/40"
                            }`}
                        >
                            <span class="text-yellow-500 font-bold">MERCADO PAGO</span>
                        </button>
                    </div>

                    {/* Lado Derecho: Formulario de Tarjeta */}
                    <div class="space-y-6">
                        <h2 class="text-lucy-light text-2xl font-fira font-bold mb-8">
                            Tarjeta de débito/crédito
                        </h2>

                        {/* Nombre del Titular */}
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre del titular de la tarjeta"
                                value={nombreTitular()}
                                onInput={(e) => setNombreTitular(e.currentTarget.value)}
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary"
                            />
                        </div>

                        {/* Número de Tarjeta */}
                        <div>
                            <input
                                type="text"
                                placeholder="Número de la tarjeta"
                                value={numeroTarjeta()}
                                onInput={(e) => setNumeroTarjeta(formatNumeroTarjeta(e.currentTarget.value))}
                                maxLength="19"
                                class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary tracking-wider"
                            />
                        </div>

                        {/* Fecha y CVV */}
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={`${mes()}${ano() ? "/" + ano() : ""}`}
                                    onInput={(e) => {
                                        const value = e.currentTarget.value.replace(/\D/g, "").slice(0, 4);
                                        if (value.length <= 2) {
                                            setMes(value);
                                        } else {
                                            setMes(value.slice(0, 2));
                                            setAno(value.slice(2, 4));
                                        }
                                    }}
                                    maxLength="5"
                                    class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary text-center"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    value={cvv()}
                                    onInput={(e) => setCvv(e.currentTarget.value.replace(/\D/g, "").slice(0, 4))}
                                    maxLength="4"
                                    class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary text-center"
                                />
                            </div>
                        </div>

                        {/* Separador */}
                        <div class="border-t border-lucy-light/10 pt-6 mt-8"></div>

                        {/* Total y Botón Pagar */}
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <p class="text-lucy-light text-lg font-work">
                                    Total:
                                </p>
                                <p class="text-lucy-secondary text-3xl font-fira font-bold">
                                    ${total.toFixed(2)} <span class="text-lucy-light/50 text-sm">MXN</span>
                                </p>
                            </div>

                            <A href="/confirmacion" class="w-full inline-flex items-center justify-center gap-2 bg-lucy-secondary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary/80 transition-colors shadow-lg">
                                Pagar
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </A>
                        </div>

                        {/* Texto de seguridad */}
                        <p class="text-lucy-light/40 text-xs text-center font-work mt-4">
                            Tu información de pago está segura mediante encriptación SSL de 256 bits
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
