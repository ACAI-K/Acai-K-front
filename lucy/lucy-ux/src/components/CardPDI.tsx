import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";
import type { PDI } from "../data/types";
import ArrowRight from 'lucide-solid/icons/arrow-right';
import { LucyButton } from "../components/LucyButton";
import Star from "lucide-solid/icons/star";
import Gmaps from "../assets/gmaps.png";
import { typeOfPDI } from "../data/mockData";

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

export default function CardPDI(props: {pdi: PDI, children: JSX.Element; href?: string, buttonText: string}) {
    return (
        <div class="flex flex-col gap-4 mt-10 overflow-hidden bg-lucy-disabled p-6 rounded-3xl shadow-lg">
            <div class="flex w-full overflow-hidden">
                {typeOfPDI(props.pdi) !== 2 ? generateImages(props.pdi.images) : generateSingleImage(props.pdi.images[0])}
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="flex flex-col items-start gap-2 w-full px-8 font-work">
                    <h3 class="text-lucy-light font-fira text-4xl">{props.pdi.name}</h3>
                    <span class="text-xl text-lucy-light mb-2">{props.pdi.categoria}</span>
                    <div class="flex items-end gap-2">
                        <A href={props.pdi.link_google_maps}>
                            <img src={Gmaps} alt="Google Maps" class="w-10 object-contain"/>
                        </A>
                        <div class="flex flex-between items-end gap-2">
                            <Show when={props.pdi.reviews}>
                                <div class="flex gap-2 text-xl items-end text-lucy-light">
                                    <For each={[1, 2, 3, 4, 5]}>
                                        {(starIndex) => (
                                            <Star size={30} fill={starIndex <= (props.pdi.reviews ? props.pdi.reviews : 0) ? "currentColor" : "none"} stroke="currentColor" stroke-width={2}/>
                                        )}
                                    </For>
                                    {(props.pdi.reviews ? props.pdi.reviews : 0) + " / 5"}
                                </div>
                            </Show>
                            <Show when={!props.pdi.reviews}>
                                <span class="text-sm text-lucy-light">Sin reseñas</span>
                            </Show>
                        </div>
                    </div>
                    <div class="flex flex-col w-full justify-end items-end gap-4">
                        <span class="text-sm my-1">{props.pdi.description}</span>
                        {props.children}
                        <LucyButton ButtonLink={props.href} ButtonText={props.buttonText} ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="sm" ButtonIconSide="right" ButtonIcon={<ArrowRight />}/>
                    </div>
                </div>
            </div>
        </div>
    );
}