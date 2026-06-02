import { For, Show } from "solid-js";
import { A } from "@solidjs/router";
import type { Habitaciones, PDI } from "../data/types";
import ArrowRight from 'lucide-solid/icons/arrow-right';
import { LucyButton, LucyButtonNoA } from "../components/LucyButton";
import BedDouble from "lucide-solid/icons/bed-double";
import Users from "lucide-solid/icons/users";
import { useNavigate } from "@solidjs/router";

const handleImageError = (e: Event) => {
    const target = e.currentTarget as HTMLImageElement;
    target.src = DEFAULT_IMAGE;
};

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";

function generateImages(imageUrls: string[]) {
    return (
        <div class="flex w-full justify-start overflow-x-hidden hover:overflow-x-scroll gap-4 scrollbar-thumb-lucy-disabled scrollbar-track-lucy-dark my-5 hover:shadow-xl hover:mb-0">
            <For each={imageUrls}>
                {(imageUrl) => (
                    <div class="relative w-fit h-85 aspect-video rounded-sm shadow-md">
                        <img src={imageUrl} alt="Imagen del alojamiento" class="h-full w-full object-cover" onError={handleImageError} />
                    </div>
                )}
            </For>
        </div>
    );
}

function generateSingleImage(imageUrl: string) {
    return (
        <div class="relative w-fit h-85 flex justify-center aspect-video rounded-sm overflow-hidden shadow-md">
            <img src={imageUrl} loading="lazy" alt="Imagen del alojamiento" class="h-full w-full object-cover" onError={handleImageError} />
        </div>
    );
}

function generateBeds(single: number, double: number, queen: number, king: number) {
    var cadenaCompleta = "";
    if (single !== 0) { cadenaCompleta += single + "Ind. " }
    if (double !== 0) { cadenaCompleta += double + "Mat. " }
    if (queen !== 0) { cadenaCompleta += queen + "Queen " }
    if (king !== 0) { cadenaCompleta += king + "King" }
    return cadenaCompleta;
}

export default function CardHab(props: {hab: Habitaciones}) {
    const navigate = useNavigate();
    return (
        <div class="flex flex-col gap-4 mt-10 overflow-hidden bg-lucy-disabled p-6 rounded-3xl shadow-lg">
            <div class="flex w-full overflow-hidden">
                {props.hab.imagenes.length !== 0 && props.hab.imagenes.length !== 1 ? generateImages(props.hab.imagenes) : generateSingleImage(props.hab.imagenes[0])}
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="flex flex-col items-start gap-2 w-full px-8 font-work">
                    <h3 class="text-lucy-light font-fira text-4xl">{props.hab.nombre}</h3>
                    <span class="text-sm my-1">{props.hab.descripcion}</span>
                    <div class="flex items-end gap-2">
                        <div class="flex flex-between items-end gap-2">
                            <div class="flex gap-2 text-xl items-end text-lucy-light">
                                <BedDouble size={30} fill="currentColor" stroke="currentColor" stroke-width={2}/>
                                <span>{ generateBeds(props.hab.camasIndividuales, props.hab.camasDobles, props.hab.camasQueenSize, props.hab.camasKingSize)}</span>
                                <Users size={30} fill="currentColor" stroke="currentColor" stroke-width={2}/>
                                <span>{props.hab.maxOcupantes} personas</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full justify-end items-end gap-4">
                        <span class="text-xl mt-2"><span class="text-2xl text-lucy-accent">${props.hab.precioNoche}</span> p/noche</span>
                        <LucyButtonNoA onClick={() => {navigate("/pago/" + props.hab.id)}} ButtonText={"Reservar"} ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="sm" ButtonIconSide="right" ButtonIcon={<ArrowRight />}/>
                    </div>
                </div>
            </div>
        </div>
    );
}