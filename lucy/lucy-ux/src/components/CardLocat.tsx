import { For } from "solid-js";
import type { PDI, TypeDormitorio, TypeParque, TypeOtro, Locat } from "../data/types";
import ArrowRight from 'lucide-solid/icons/arrow-right';
import { LucyButton } from "../components/LucyButton";
import { typeOfPDI } from "../data/mockData";
    const handleImageError = (e: Event) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = DEFAULT_IMAGE;
    };

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80";

function generatePDISection(pdi: PDI) {
    return (
    <div class="group">
        <div class="flex flex-col items-start gap-4">
            <div class="flex items-start gap-4">
                <div class="relative w-fit h-85 aspect-video rounded-sm overflow-hidden shadow-md">
                    {generatePDISectionPerCat(pdi)}
                </div>
            </div>
        </div>
    </div>
    );
}

function generatePDISectionPerCat(pdi: PDI) {
    const type = typeOfPDI(pdi);
    if (type === 0) {
        const dorm = pdi as TypeDormitorio;
        const image = dorm.images.length > 0 ? dorm.images[0] : DEFAULT_IMAGE;
        return (
            <>
                <img src={image} loading="lazy" alt={dorm.name} class="h-full w-full" onError={handleImageError} />
                <div class={`absolute inset-0 bg-lucy-dark opacity-0 transition-opacity duration-500 group-hover:opacity-50 flex flex-col justify-center items-center aspect-video rounded-sm overflow-hidden shadow-md w-full h-full text-transparent hover:text-lucy-light`}/>
                <div class={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-center items-center aspect-video rounded-sm overflow-hidden shadow-md w-full h-full text-transparent hover:text-lucy-light`}>
                    {dorm.name && <h4 class="text-lg font-bold">{dorm.name}</h4>}
                    {dorm.precio_noche && <span class="text-sm text-lucy-secondary mt-2">Desde ${dorm.precio_noche} p/noche</span>}
                    <LucyButton ButtonLink={`/reservas/${dorm.id}}`} ButtonText="Reserva ahora" ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="sm" ButtonIconSide="right" ButtonIcon={<ArrowRight />} class="mt-8"/>
                </div>
            </>
        );
    } else if (type === 1) {
        const park = pdi as TypeParque;
        const image = park.images.length > 0 ? park.images[0] : DEFAULT_IMAGE;
        return (
            <>
                <img src={image} loading="lazy" alt={park.name} class="h-full w-full" onError={handleImageError} />
                <div class={`absolute inset-0 bg-lucy-dark opacity-0 transition-opacity duration-500 group-hover:opacity-50 flex flex-col justify-center items-center aspect-video rounded-sm overflow-hidden shadow-md w-full h-full text-transparent hover:text-lucy-light`}/>
                <div class={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-center items-center aspect-video rounded-sm overflow-hidden shadow-md w-full h-full text-transparent hover:text-lucy-light`}>
                    {park.name && <h4 class="text-lg font-bold">{park.name}</h4>}
                    {park.precio_por_dia && <span class="text-sm text-lucy-secondary mt-2">Desde ${park.precio_por_dia} p/día</span>}
                    <LucyButton ButtonLink={`/park/${park.id}}`} ButtonText="Consulta ahora" ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="sm" ButtonIconSide="right" ButtonIcon={<ArrowRight />} class="mt-8"/>
                </div>
            </>
        );
    } else if (type === 2) {
        const otro = pdi as TypeOtro;
        const image = otro.images.length > 0 ? otro.images[0] : DEFAULT_IMAGE;
        return (
            <>
                <img src={image} loading="lazy" alt={otro.name} class="h-full w-full" onError={handleImageError} />
                <div class={`absolute inset-0 bg-lucy-dark opacity-0 transition-opacity duration-500 group-hover:opacity-50 flex flex-col justify-center items-center aspect-video rounded-sm overflow-hidden shadow-md w-full h-full text-transparent hover:text-lucy-light`}/>
                <div class={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-center items-center aspect-video rounded-sm overflow-hidden shadow-md w-full h-full text-transparent hover:text-lucy-light`}>
                    {otro.name && <h4 class="text-lg font-bold">{otro.name}</h4>}
                    <LucyButton ButtonLink={`/mapa?lat=${otro.coordinates.lat}&lng=${otro.coordinates.lng}`} ButtonText="Checa ahora" ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="sm" ButtonIconSide="right" ButtonIcon={<ArrowRight />} class="mt-8"/>
                </div>
            </>
        );
    }
}


export default function CardLocat(props: {locat: Locat}) {
    return (
        <div class="flex flex-col gap-4 animate-fade-in mt-10 overflow-hidden bg-lucy-disabled p-6 rounded-3xl border border-gray-700 shadow-lg transition-all">
            <div class="flex w-full justify-start overflow-x-hidden hover:overflow-x-scroll gap-4 scrollbar-thumb-lucy-disabled scrollbar-track-lucy-dark my-5 hover:shadow-xl hover:mb-0">
                <For each={props.locat.puntos_interes}>
                    {(pdi) => (generatePDISection(pdi))}
                </For>
            </div>
            <div class="flex justify-between items-center mt-4 px-2">
                <h3 class="text-lucy-light text-4xl">{props.locat.name}</h3>
                <LucyButton ButtonLink={`/mapa?lat=${props.locat.map_data.coordinates.lat}&lng=${props.locat.map_data.coordinates.lng}`} ButtonText="Ver en mapa" ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="sm" ButtonIconSide="right" ButtonIcon={<ArrowRight />} />
            </div>
        </div>
    );
}