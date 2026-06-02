import { createSignal } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import { Navigation } from "../components/Navigation";
import { LucyButton, LucyButtonNoA, LucyIconButtonNoA } from "../components/LucyButton";
import { SiPaypal, SiAmericanexpress, SiDiscover, SiMastercard, SiVisa, SiMercadopago } from "solid-icons/si";
import ChevronRight from "lucide-solid/icons/chevron-right";

type MetodoPago = "paypal" | "tarjeta" | "amex" | "discover" | "mastercard" | "visa" | "mercadopago";

export default function Pago() {
    const navigate = useNavigate();
    const [metodoPago, setMetodoPago] = createSignal<MetodoPago>("mastercard");
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
        <div class="min-h-screen flex flex-between mx-auto">
            {/* Contenido Principal */}
            <main class="max-w-6xl mx-auto p-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Lado Izquierdo: Métodos de Pago */}
                    <div class="flex flex-col justify-center md:justify-start items-center lg:items-start w-full gap-2">
                        <h2 class="text-lucy-light text-4xl font-fira font-bold">
                            Ingresa método de pago
                        </h2>
                        <p class="text-lucy-light/60 text-sm font-work my-2">
                            Selecciona uno de nuestros métodos disponibles
                        </p>

                        <LucyButtonNoA onClick={() => setMetodoPago("paypal")} ButtonBackground={metodoPago() === "paypal" ? "lucy-secondary" : "lucy-dark"} ButtonForeground={metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"} ButtonText="PayPal" ButtonSize="lg" ButtonIconSide="left" ButtonIcon={<SiPaypal size={24} color={`${metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"}`} />} />
                        <LucyButtonNoA onClick={() => setMetodoPago("amex")} ButtonBackground={metodoPago() === "amex" ? "lucy-secondary" : "lucy-dark"} ButtonForeground={metodoPago() === "amex" ? "lucy-dark" : "lucy-light"} ButtonText="American Express" ButtonSize="lg" ButtonIconSide="left" ButtonIcon={<SiAmericanexpress size={24} color={`${metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"}`} />} />
                        <LucyButtonNoA onClick={() => setMetodoPago("discover")} ButtonBackground={metodoPago() === "discover" ? "lucy-secondary" : "lucy-dark"} ButtonForeground={metodoPago() === "discover" ? "lucy-dark" : "lucy-light"} ButtonText="Discover" ButtonSize="lg" ButtonIconSide="left" ButtonIcon={<SiDiscover size={24} color={`${metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"}`} />} />
                        <LucyButtonNoA onClick={() => setMetodoPago("mastercard")} ButtonBackground={metodoPago() === "mastercard" ? "lucy-secondary" : "lucy-dark"} ButtonForeground={metodoPago() === "mastercard" ? "lucy-dark" : "lucy-light"} ButtonText="MasterCard" ButtonSize="lg" ButtonIconSide="left" ButtonIcon={<SiMastercard size={24} color={`${metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"}`} />} />
                        <LucyButtonNoA onClick={() => setMetodoPago("visa")} ButtonBackground={metodoPago() === "visa" ? "lucy-secondary" : "lucy-dark"} ButtonForeground={metodoPago() === "visa" ? "lucy-dark" : "lucy-light"} ButtonText="VISA" ButtonSize="lg" ButtonIconSide="left" ButtonIcon={<SiVisa size={24} color={`${metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"}`} />} />
                        <LucyButtonNoA onClick={() => setMetodoPago("mercadopago")} ButtonBackground={metodoPago() === "mercadopago" ? "lucy-secondary" : "lucy-dark"} ButtonForeground={metodoPago() === "mercadopago" ? "lucy-dark" : "lucy-light"} ButtonText="Mercado Pago" ButtonSize="lg" ButtonIconSide="left" ButtonIcon={<SiMercadopago size={24} color={`${metodoPago() === "paypal" ? "lucy-dark" : "lucy-light"}`} />} />
                        
                    </div>

                    {/* Lado Derecho: Formulario de Tarjeta */}
                    <div class="flex flex-col w-full gap-6">
                        <form onSubmit={() => {}} class="flex flex-col justify-center p-8 w-full gap-8">
                            <h2 class="text-2xl font-fira font-bold text-lucy-light">Tarjeta de débito/crédito</h2>
                            <input 
                                type="text" placeholder="Nombre del titular de la tarjeta" required
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setNombreTitular(e.currentTarget.value)}/>
                            <input
                                type="text" placeholder="Número de la tarjeta" required
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setNumeroTarjeta(formatNumeroTarjeta(e.currentTarget.value))}
                                maxLength={19}
                            />
                            <div class="flex flex-col md:flex-row items-center gap-6">
                                <input
                                    type="text" placeholder="MM/YY" required
                                    class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium text-center"
                                    onInput={(e) => {
                                        const value = e.currentTarget.value.replace(/\D/g, "").slice(0, 4);
                                        if (value.length <= 2) {
                                            setMes(value);
                                        } else {
                                            setMes(value.slice(0, 2));
                                            setAno(value.slice(2, 4));
                                        }
                                    }}
                                    maxLength={5}
                                />
                                <input
                                    type="text" placeholder="CVV" required
                                    class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium text-center"
                                    onInput={(e) => setCvv(e.currentTarget.value.replace(/\D/g, "").slice(0, 4))}
                                    maxLength={4}
                                />
                            </div>

                            {/* Separador */}
                            <div class="h-px bg-lucy-light mt-8"></div>
                            {/* Total y Botón Pagar */}
                            <div class="flex items-center justify-between">
                                <p class="text-lucy-light text-lg font-work">
                                    Total:
                                </p>
                                <p class="text-lucy-secondary text-3xl font-fira font-bold">
                                    ${total.toFixed(2)} <span class="text-lucy-light/50 text-sm">MXN</span>
                                </p>
                            </div>

                            {/* Texto de seguridad */}
                            <p class="text-lucy-light/40 text-xs text-center font-work mt-4">
                                Tu información de pago está segura mediante encriptación SSL de 256 bits
                            </p>
                            <LucyButtonNoA onClick={() => {navigate("/confirmacion")}} ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonText="Pagar" ButtonSize="lg" ButtonIconSide="right" ButtonIcon={<ChevronRight />} class="w-fit px-16 self-end" />
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}