import { For, Show } from "solid-js";
import { useSearchParams, A } from "@solidjs/router";
import { Navigation } from "../components/Navigation.tsx";
import { SearchBar } from "../components/SearchBar";
import { MOCK_LOCATIONS, typeOfPDI } from "../data/mockData.ts";
import { FilterMenu } from "../components/FilterMenu";
import { createSignal} from "solid-js";
import { LucyButtonNoA, LucyIconButtonNoA } from "../components/LucyButton.tsx";
import SlidersHorizontal from "lucide-solid/icons/sliders-horizontal";
import type { Locat, PDI, TypeDormitorio, TypeOtro, TypeParque } from "../data/types.ts";
import CardLocat from "../components/CardLocat.tsx";
import CardDorm from "../components/CardDorm.tsx";
import CardPark from "../components/CardPark.tsx";
import CardOtro from "../components/CardOtro.tsx";
import Search from "lucide-solid/icons/search";

function concatenatedQuery (s: string | string[], separator: string = "") {
    if (Array.isArray(s)) 
        return s.join(separator); 
    else 
        return s;
}

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = () => searchParams.query || "";
    const [isFilterOpen, setIsFilterOpen] = createSignal(false);
    const [concatenatedQueryValue, setConcatenatedQueryValue] = createSignal(concatenatedQuery(query()));
    const [results, setResults] = createSignal<(Locat | PDI )[]>([]);

    setConcatenatedQueryValue(concatenatedQuery(query()).toLowerCase());
    
    const resultsLocat = MOCK_LOCATIONS.filter(location =>
        location.name.toLowerCase().includes(concatenatedQueryValue())
    );

    const resultsPDI : (TypeDormitorio | TypeParque | TypeOtro)[] = [];

    for (const loc of MOCK_LOCATIONS) {
        const resultPDI = loc.puntos_interes.filter(p => p.name.toLowerCase().includes(concatenatedQueryValue()));
        resultsPDI.push(...resultPDI);
    }

    setResults([...resultsLocat, ...resultsPDI,]);

    return (
        <div class="min-h-screen bg-lucy-dark text-white font-work pb-24 relative overflow-hidden">
            {/* Render del filtro */}
            <Show when={isFilterOpen()}>
                <FilterMenu onFilterChange={(f) => console.log("Mock de filtros a aplicar:", f)}/>
            </Show>

            <div class="max-w-4xl mx-auto pt-16 px-8">

                {/* Cabecera de Busqueda */}
                <div class="flex flex-col items-end mb-16 relative z-10 w-full pr-16 md:pr-0 md:w-5/6 mx-auto">

                    {/* Componente Busqueda */}
                    <SearchBar initialValue={concatenatedQuery(query(), " ")} />

                    {/* Boton Filtros */}
                    <LucyIconButtonNoA ButtonBackground={isFilterOpen() ? "lucy-secondary" : "lucy-primary"} ButtonForeground="lucy-dark" ButtonSize="md" ButtonIcon={<SlidersHorizontal size={30}/>} onClick={() => setIsFilterOpen(!isFilterOpen())} />
                </div>

                {/* Lista de Resultados */}
                <div class="flex flex-col gap-12">
                    <For each={results()}>
                        {(result, index) => {
                            if (!("categoria" in result)) {
                                return <CardLocat locat={result} />;
                            }
                            result = result as TypeDormitorio | TypeParque | TypeOtro;
                            switch (typeOfPDI(result)) {
                                case 0:
                                    return <CardDorm dorm={result as TypeDormitorio} />;
                                case 1:
                                    return <CardPark park={result as TypeParque} />;
                                case 2:
                                    return <CardOtro otro={result as TypeOtro} />;
                            }
                        }}
                    </For>

                    {/* Mensaje de 0 Resultados */}
                    <Show when={results().length === 0}>
                        <div class="text-center py-16">
                            <p class="text-2xl text-gray-400 font-fira">No se encontraron resultados para
                                "{concatenatedQuery(query(), " ")}"</p>
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
                    <LucyButtonNoA ButtonBackground="lucy-dark" ButtonText="Hacer Otra Busqueda" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="right" ButtonIcon={<Search size={30}/>} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} class="cursor-pointer" /> 
                </div>
            </div>
        </div>
    );
}