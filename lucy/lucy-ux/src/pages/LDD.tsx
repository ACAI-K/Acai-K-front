// /reservas/{idLDD}
import { For, Show } from "solid-js";
import { useSearchParams, A, useParams, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation.tsx";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData.ts";
import { createSignal} from "solid-js";
import { LucyButton } from "../components/LucyButton.tsx";
import type { Habitaciones, TypeDormitorio } from "../data/types.ts";
import CardDorm from "../components/CardDorm.tsx";
import Map from "lucide-solid/icons/map";


export default function SearchResults() {
    const navigate = useNavigate();
    const params = useParams();
    const [results, setResults] = createSignal<Habitaciones[]>([]);
    
    const hoteles = []
    for (const loc of MOCK_LOCATIONS) {
        hoteles.push(...loc.puntos_interes.filter(p => typeOfPDI(p) === 0).map(p => p as TypeDormitorio));
    }
    setResults(hoteles);

    return (
        <div class="min-h-screen bg-lucy-dark text-white font-work pb-24 relative overflow-hidden">

            {/* Navegacion Flotante */}
            <Navigation class="absolute top-8 right-8"/>

            {/* Lista de Resultados */}
            <div class="flex flex-col gap-12">
                <For each={results()}>
                    {(result, index) => (
                        <CardDorm dorm={result as TypeDormitorio} />
                    )}
                </For>
                {/* Mensaje de 0 Resultados */}
                <Show when={results().length === 0}>
                    <div class="text-center py-16">
                        <p class="text-2xl text-gray-400 font-fira">No se encontraron resultados para
                            Lugares de descanso</p>
                    </div>
                </Show>
            </div>

            {/* Footer de Busqueda */}
            <div class="mt-24 mb-8 text-center flex flex-col items-center space-y-8">
                <div class="text-gray-300 font-work text-lg leading-relaxed">
                    <p>No hay más resultados</p>
                    <p>¿No es lo que buscabas?</p>
                </div>
                {/* Botón Secundario */}
                <LucyButton ref={"/mapa"} ButtonBackground="lucy-dark" ButtonText="Hacer Otra Busqueda" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<Map size={30}/>} class="cursor-pointer" /> 
            </div>
        </div>
    );
}