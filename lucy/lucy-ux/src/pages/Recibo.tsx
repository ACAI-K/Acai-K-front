// /reservas/{idLDD}/{idHab}
import { createSignal, Show } from "solid-js";
import CreateAcc from "../components/CreateAcc";
import { LucyButton, LucyIconButton, LucyIconButtonNoA } from "../components/LucyButton";
import { Navigation } from "../components/Navigation";
import { useNavigate, useParams } from "@solidjs/router";
import type { Habitaciones, TypeDormitorio } from "../data/types";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData";
import ArrowRight from "lucide-solid/icons/arrow-right";

const fechaEstatica = "Del 12 al 18 de Octubre, 2026";
const nochesEstaticas = 6;
const huespedesEstaticos = 2;


export default function Recibo() {
    const navigate = useNavigate();
    const params = useParams();
    const [result, setResult] = createSignal<(Habitaciones | null)>(null);
    // Obtiene la habitación del typedormitorio con id params.idLDD
    const dorm = MOCK_LOCATIONS.flatMap(loc => loc.puntos_interes)
                                        .filter(p => typeOfPDI(p) === 0 && p.id === params.idLDD)
                                        .map(p => p as TypeDormitorio)
                                        .find(d => d.id === params.idLDD) || null;
    if (!dorm) { return (
        <div class="text-center py-16 flex flex-col items-center w-full h-full">
        <p class="text-2xl text-gray-400 font-fira">No se encontraron resultados para
                de esta habitación</p>
        </div>
    ); }
    
    const habitacion = dorm.habitaciones.find(hab => hab.id === params.idHab) || null;

    setResult(habitacion);
    return (
        <div class="bg-lucy-dark text-lucy-light flex flex-col justify-between font-work h-full w-full mx-auto">
            {/* Area central del formulario */}
            <div class="w-full flex items-center justify-center p-6 h-auto">

                {/* INICIAR SESION */}
                <div class="w-full max-w-4xl rounded-4xl shadow-2xl grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
                    <CreateAcc />
                    <Show when={dorm && result()}>
                        <div class="flex flex-col justify-start p-8 w-[50dvw]] md:w-full gap-2">
                            <img src={dorm.images[0]} alt={dorm.name} class="object-cover w-[30dvw]" />
                            <div class="flex flex-col justify-center p-8 w-full gap-2">
                                <h2 class="text-3xl font-fira font-bold text-lucy-light">{dorm.name}</h2>
                                <p class="text-lg text-lucy-light font-work">{fechaEstatica} · {nochesEstaticas} noches · {huespedesEstaticos} huéspedes</p>
                            </div>
                            <div class="flex w-[30dvw] items-start">
                                <img src={habitacion?.imagenes[0]} alt={habitacion?.nombre} class="w-full h-full object-cover" />
                            </div>
                            <div class="flex flex-col justify-center p-8 w-full">
                                <h2 class="text-3xl font-fira font-bold text-lucy-light">{habitacion?.nombre}</h2>
                                <p class="text-lg text-lucy-accent font-work">${habitacion?.precioNoche} MNX</p>
                                <p class="text-md text-lucy-light font-work">por noche</p>
                            </div>
                            <div class="h-1 bg-lucy-light w-full mt-4 mb-2"></div>
                            <div class="flex flex-arround  justify-between w-full ">
                                <p class="text-2xl font-fira font-bold text-lucy-light">Total:</p>
                                <p class="text-2xl text-lucy-accent font-work">${habitacion?.precioNoche && (habitacion.precioNoche * nochesEstaticas).toFixed(2)} MNX</p>
                            </div>
                            <LucyButton ButtonLink={"/pago"} ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonText="Proceder al Pago" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<ArrowRight />} class="self-end mt-4 cursor-pointer" />
                        </div>
                    </Show>
                </div>
            </div>
        </div>
    );
}