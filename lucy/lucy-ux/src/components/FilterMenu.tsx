import { createSignal, For, createEffect } from "solid-js";
import Star from 'lucide-solid/icons/star';
import { CATEGORIAS_DISPONIBLES, AMENIDADES_DISPONIBLES } from "../data/mockData";

interface FilterMenuProps {
    onFilterChange: (filters: {
        categories: string[];
        rating: number;
        amenities: string[];
    }) => void;
}

export function FilterMenu(props: FilterMenuProps) {
    const [selectedCategories, setSelectedCategories] = createSignal<string[]>(["Parques"]);
    const [rating, setRating] = createSignal<number>(4);
    const [selectedAmenities, setSelectedAmenities] = createSignal<string[]>([]);

    createEffect(() => {
        props.onFilterChange({
            categories: selectedCategories(),
            rating: rating(),
            amenities: selectedAmenities()
        });
    });

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleAmenity = (id: string) => {
        setSelectedAmenities(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    return (
        <div
            class="absolute top-48 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl text-lucy-light rounded-3xl p-8 shadow-2xl border border-gray-800/60 animate-fade-in"
            style="background-color: #1B181A;"
        >
            <div class="flex gap-16 font-work">

                {/* Columna Izquierda: Seleccion Multiple de Categorias */}
                <div class="space-y-4 flex flex-col justify-center">
                    <For each={CATEGORIAS_DISPONIBLES}>
                        {(cat) => (
                            <label class="flex items-center gap-4 cursor-pointer select-none group">
                                <input
                                    type="checkbox"
                                    class="w-5 h-5 cursor-pointer appearance-none rounded-full bg-lucy-disabled hover:bg-lucy-support border border-lucy-light checked:bg-lucy-secondary transition-colors"
                                    checked={selectedCategories().includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                                <span class={`text-base transition-colors ${selectedCategories().includes(cat) ? "text-lucy-light font-semibold" : "text-lucy-light/70 group-hover:text-lucy-light"}`}>
                                    {cat}
                                </span>
                            </label>
                        )}
                    </For>
                </div>

                {/* Columna Derecha: Reseñas Estelares y Amenidades */}
                <div class="flex flex-col justify-between">
                    {/* Bloque de Calificacion */}
                    <div>
                        <p class="text-sm font-fira tracking-wide uppercase text-gray-400 mb-2">Reseñas</p>
                        <div class="flex gap-1.5 text-lucy-secondary">
                            <For each={[1, 2, 3, 4, 5]}>
                                {(starIndex) => (
                                    <button
                                        type="button"
                                        onClick={() => setRating(starIndex)}
                                        class="transform active:scale-95 transition-transform cursor-pointer"
                                    >
                                        <Star size={30} fill={starIndex <= rating() ? "currentColor" : "none"} stroke="currentColor" stroke-width={2} class="hover:text-lucy-accent"/>
                                    </button>
                                )}
                            </For>
                        </div>
                    </div>

                    {/* Bloque de Amenidades */}
                    <div class="mt-6">
                        <p class="text-sm font-fira tracking-wide uppercase text-gray-400 mb-4">Amenidades</p>
                        <div class="flex flex-wrap justify-between items-center gap-4 text-center text-xs">
                            <For each={AMENIDADES_DISPONIBLES}>
                                {(amenidad) => {
                                    const isSelected = () => selectedAmenities().includes(amenidad.id);
                                    return (
                                        <div class={`flex flex-col w-fit items-center gap-1 px-3 py-1 rounded-full text-sm text-lucy-light cursor-pointer transition-all ${isSelected() ? 'text-lucy-secondary' : 'text-lucy-light hover:text-lucy-accent'} `} onClick={() => toggleAmenity(amenidad.id)}>
                                            {<amenidad.icono size={25} fill={`${isSelected() ? 'text-lucy-secondary' : 'text-lucy-light hover:text-lucy-accent'}`} />}
                                            <span class="max-w-25 text-center">{amenidad.nombre}</span>
                                        </div>
                                    )
                                }}
                            </For>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}