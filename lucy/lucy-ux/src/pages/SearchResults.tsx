import { For, Show } from "solid-js";
import { useSearchParams, A } from "@solidjs/router";
import { Navigation } from "../components/Navigation.tsx";
import { SearchBar } from "../components/SearchBar";
import { MOCK_PARKS } from "../data/mockData.ts";
import { FilterMenu } from "../components/FilterMenu";
import { createSignal} from "solid-js";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = () => searchParams.q || "";
    const [isFilterOpen, setIsFilterOpen] = createSignal(false);

    const results = () => MOCK_PARKS.filter(p =>
        p.name.toLowerCase().includes(query().toLowerCase()) ||
        p.location.toLowerCase().includes(query().toLowerCase())
    );

    return (
        <div className="min-h-screen bg-lucy-dark text-white font-work pb-24 relative overflow-hidden">

            {/* Navegacion Flotante */}
            <Navigation class="absolute top-8 right-8"/>

            {/* Render del filtro */}
            <Show when={isFilterOpen()}>
                <FilterMenu onFilterChange={(f) => console.log("Mock de filtros a aplicar:", f)}/>
            </Show>

            <div className="max-w-4xl mx-auto pt-16 px-8">

                {/* Cabecera de Busqueda */}
                <div class="flex flex-col items-end mb-16 relative z-10 w-full pr-16 md:pr-0 md:w-5/6 mx-auto">

                    {/* Componente Busqueda */}
                    <SearchBar initialValue={query()} />

                    {/* Boton Filtros */}
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen())}
                        class={`mt-4 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors border border-gray-700/50 cursor-pointer active:scale-95 ${isFilterOpen() ? 'bg-lucy-secondary text-lucy-dark' : 'bg-lucy-dark text-white hover:text-lucy-secondary'}`}
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
                        </svg>
                    </button>

                </div>

                {/* Lista de Resultados */}
                <div className="space-y-12">
                    <For each={results()}>
                        {(park, index) => (
                            <div className="flex flex-col md:flex-row gap-8 animate-fade-in">

                                {/* Imagen / Placeholder */}
                                <div
                                    className="w-full md:w-[35%] aspect-video md:aspect-[4/3] relative overflow-hidden shadow-lg"
                                    style={`background-color: ${index() % 2 === 0 ? '#3D4D20' : '#5A4620'}`}
                                >
                                    <img src={park.image} alt={park.name}
                                         class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"/>
                                    <svg class="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" stroke-width="1"/>
                                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" stroke-width="1"/>
                                    </svg>
                                </div>

                                {/* Detalles del Resultado */}
                                <div
                                    className="w-full md:w-[65%] flex flex-col justify-between py-2 border-b border-gray-800 pb-8 md:border-b-0 md:pb-2">
                                    <div>
                                        <h3 class="text-2xl font-fira font-bold text-white mb-1 tracking-wide">{park.name}</h3>
                                        <p class="text-gray-400 text-sm mb-2">{index() % 2 === 0 ? 'Habitaciones' : 'Clínica'}</p>

                                        {/* Estrellas mock */}
                                        <Show when={index() % 2 === 0}>
                                            <div className="flex gap-1 text-white mb-6 text-sm">
                                                <For each={[1, 2, 3, 4]}>{() => <span>★</span>}</For>
                                                <span class="text-gray-600">☆</span>
                                            </div>
                                        </Show>

                                        <p class="text-sm text-gray-300 mt-4">{park.location}</p>
                                        <p class="text-sm text-gray-500 font-fira mt-1">C. Insurgente M346 L11</p>
                                    </div>

                                    {/* Boton de Acción */}
                                    <Show when={index() % 2 === 0}>
                                        <div className="flex justify-end mt-6 md:mt-0">
                                            <A href={`/park/${park.id}`}
                                               class="bg-lucy-primary text-lucy-dark px-6 py-2.5 rounded-full font-fira font-bold text-sm flex items-center gap-2 hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer">
                                                Reserva aquí
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                     viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                            </A>
                                        </div>
                                    </Show>
                                </div>

                            </div>
                        )}
                    </For>

                    {/* Mensaje de 0 Resultados */}
                    <Show when={results().length === 0}>
                        <div className="text-center py-16">
                            <p class="text-2xl text-gray-400 font-fira">No se encontraron resultados para
                                "{query()}"</p>
                        </div>
                    </Show>
                </div>

                {/* Footer de Busqueda */}
                <div className="mt-24 mb-8 text-center flex flex-col items-center space-y-8">
                    <div className="text-gray-300 font-work text-lg leading-relaxed">
                        <p>No hay más resultados</p>
                        <p>¿No es lo que buscabas?</p>
                    </div>
                    {/* Botón Secundario */}
                    <button
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                        class="bg-lucy-secondary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-white transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                        Hacer otra búsqueda
                    </button>
                </div>

            </div>
        </div>
    );
}