import { createSignal, For, createEffect } from "solid-js";
import Star from 'lucide-solid/icons/star';

interface FilterMenuProps {
    onFilterChange: (filters: {
        categories: string[];
        rating: number;
        amenities: string[];
    }) => void;
}

const CATEGORIES = ["Parques", "Hoteles", "Cabañas", "Campamentos", "Hospitales", "Policía", "Gasolinería"];
const AMENITIES = [
    { id: "wifi", label: "Wi-Fi", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
    { id: "parking", label: "Estacionamiento", isTextIcon: true, textIcon: "P" },
    { id: "gym", label: "GYM", icon: "M18 3h-2v4h-8v-4h-2v4h-2v3h14v-3h-2v-4zM2 11h20v2h-20vz" }, // Icono dummy para GYM
    { id: "breakfast", label: "Desayuno", icon: "M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" },
    { id: "pets", label: "Pet-friendly", isTextIcon: true, textIcon: "🐾" }
];

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
            <div class="grid grid-cols-2 gap-8 font-work">

                {/* Columna Izquierda: Seleccion Multiple de Categorias */}
                <div class="space-y-4 flex flex-col justify-center">
                    <For each={CATEGORIES}>
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
                        <div class="grid grid-cols-4 gap-4 text-center text-xs">
                            <For each={AMENITIES}>
                                {(amenity) => {
                                    const isSelected = () => selectedAmenities().includes(amenity.id);
                                    return (
                                        <div
                                            class={`flex flex-col items-center gap-1 cursor-pointer transition-all ${isSelected() ? 'text-lucy-secondary' : 'text-gray-400 hover:text-lucy-light'}`}
                                            onClick={() => toggleAmenity(amenity.id)}
                                        >
                                            <div class={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${isSelected() ? 'border-lucy-secondary bg-lucy-secondary/10 shadow-[0_0_12px_rgba(255,200,76,0.2)]' : 'border-gray-700 bg-gray-800/40'}`}>
                                                {amenity.isTextIcon ? (
                                                    <span class="text-xl font-bold select-none">{amenity.textIcon}</span>
                                                ) : (
                                                    <svg class="w-5 h-5" fill={isSelected() ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={amenity.icon}></path>
                                                    </svg>
                                                )}
                                            </div>
                                            <span class="scale-90 font-medium tracking-tight lucy-lightspace-nowrap">{amenity.label}</span>
                                        </div>
                                    );
                                }}
                            </For>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}