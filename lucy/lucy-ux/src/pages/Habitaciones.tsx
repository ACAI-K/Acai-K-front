// /reservas/{idLDD}
import { For, Show } from "solid-js";
import { useSearchParams, A, useParams, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation.tsx";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData.ts";
import { createSignal} from "solid-js";
import { LucyButton, LucyIconButtonNoA } from "../components/LucyButton.tsx";
import type { Habitaciones, TypeDormitorio } from "../data/types.ts";
import CardHab from "../components/CardHab.tsx";
import Map from "lucide-solid/icons/map";
import ArrowLeft from "lucide-solid/icons/arrow-left";


export default function SearchResults() {
    const navigate = useNavigate();
    const params = useParams();
    const [results, setResults] = createSignal<Habitaciones[]>([]);
    // Obtiene las habitaciones del typedormitorio con id params.idLDD
    const habitaciones = MOCK_LOCATIONS.flatMap(loc => loc.puntos_interes)
                                        .filter(p => typeOfPDI(p) === 0 && p.id === params.idLDD)
                                        .map(p => p as TypeDormitorio)
                                        .flatMap(dorm => dorm.habitaciones) as Habitaciones[];
    setResults(habitaciones);

    return (
        <div class="min-h-screen bg-lucy-dark text-white font-work pb-24 relative overflow-hidden">
            {/* Lista de Resultados */}
            <div class="flex flex-col gap-12">
                <For each={results()}>
                    {(result, index) => (
                        <CardHab hab={result} />
                    )}
                </For>
                {/* Mensaje de 0 Resultados */}
                <Show when={results().length === 0}>
                    <div class="text-center py-16">
                        <p class="text-2xl text-gray-400 font-fira">No se encontraron resultados para
                            habitaciones de este Lugar de Descanso</p>
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