import { createSignal, Show } from "solid-js";
import type { JSX } from "solid-js";
import { A } from "@solidjs/router";

export function Navigation(props: { class?: string; children?: JSX.Element }) {
    const [isOpen, setIsOpen] = createSignal(true);

    return (
        <div class={`z-50 ${props.class || ""}`}>
            <Show
                when={isOpen()}
                fallback={
                    <button
                        onClick={() => setIsOpen(true)}
                        class="text-white hover:text-lucy-secondary transition-colors drop-shadow-lg p-2 bg-lucy-dark/50 rounded-md backdrop-blur-sm border border-white/10"
                    >
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                }
            >
                <nav class="text-right flex flex-col items-end space-y-2 animate-fade-in">
                    <button
                        onClick={() => setIsOpen(false)}
                        class="text-white mb-4 hover:text-lucy-secondary transition-colors drop-shadow-lg"
                    >
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <A href="/" class="text-white font-work font-semibold text-lg drop-shadow-md hover:text-lucy-secondary transition-colors">Inicio</A>
                    <A href="/explorar" class="text-white font-work font-semibold text-lg drop-shadow-md hover:text-lucy-secondary transition-colors">Explorar</A>
                    <A href="/hospedaje" class="text-white font-work font-semibold text-lg drop-shadow-md hover:text-lucy-secondary transition-colors">Hospedaje</A>
                    <A href="/cuenta" class="text-white font-work font-semibold text-lg drop-shadow-md hover:text-lucy-secondary transition-colors">Cuenta</A>

                    <Show when={props.children}>
                        <div class="pt-12">
                            {props.children}
                        </div>
                    </Show>
                </nav>
            </Show>
        </div>
    );
}