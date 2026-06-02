
import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

interface SearchBarProps {
    initialValue?: string;
    class?: string;
    onSearch?: (query: string) => void;
}

export function SearchBar(props: SearchBarProps) {
    const [query, setQuery] = createSignal(props.initialValue || "");
    const navigate = useNavigate();

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (props.onSearch) {
            props.onSearch(query());
        } else if (query().trim()) {
            navigate(`/search?query=${encodeURIComponent(query())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} class={`w-full ${props.class || ""}`}>
            <div class="w-full flex items-center bg-lucy-light text-lucy-dark rounded-full px-6 py-3 shadow-xl border border-transparent transition-colors">
                <input
                    type="text"
                    placeholder="Busca refugios, clínicas o parques..."
                    value={query()}
                    onInput={(e) => setQuery(e.currentTarget.value)}
                    class="bg-transparent border-none outline-none w-full text-lg placeholder-gray-500 font-work font-medium"
                />
                <button type="submit" class="ml-4 hover:text-lucy-primary transition-colors cursor-pointer active:scale-95">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </form>
    );
}