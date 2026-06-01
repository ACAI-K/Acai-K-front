import { createSignal, Show, onMount, onCleanup } from "solid-js";
import type { JSX } from "solid-js";
import X from 'lucide-solid/icons/x';
import Menu from 'lucide-solid/icons/menu';
import { A } from "@solidjs/router";

export function Navigation(props: { class?: string; children?: JSX.Element }) {
    const [isOpen, setIsOpen] = createSignal(false);
    const handleScroll = () => {
        if (isOpen()) {
            setIsOpen(false);
        }
    };

    onMount(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onCleanup(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    return (
        <div class={`fixed p-4 z-50 w-full flex flex-col items-end  ${props.class || ""}`}>
            <Show
                when={isOpen()}
                fallback={
                    <button
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu class="text-lucy-light hover:text-lucy-secondary transition-colors drop-shadow-xl drop-shadow-lucy-dark/40" size={35} stroke-width={2} absoluteStrokeWidth={true} />
                    </button>
                }
            >
                <nav class="text-right flex flex-col items-end gap-4 animate-fade-in duration-10">
                    <button onClick={() => setIsOpen(false)}>
                        <X class="text-lucy-light hover:text-lucy-secondary transition-colors drop-shadow-xl drop-shadow-lucy-dark/40" size={35} stroke-width={2} absoluteStrokeWidth={true} />
                    </button>
                    <div class="flex flex-col items-end space-y-1">
                        <A href="/" class="text-lucy-light font-work font-semibold text-lg hover:text-lucy-secondary transition-colors hover:underline hover:decoration-lucy-secondary drop-shadow-md drop-shadow-lucy-dark/30">Inicio</A>
                        <A href="/explorar" class="text-lucy-light font-work font-semibold text-lg hover:text-lucy-secondary transition-colors hover:underline hover:decoration-lucy-secondary drop-shadow-md drop-shadow-lucy-dark/30">Explorar</A>
                        <A href="/hospedaje" class="text-lucy-light font-work font-semibold text-lg hover:text-lucy-secondary transition-colors hover:underline hover:decoration-lucy-secondary drop-shadow-md drop-shadow-lucy-dark/30">Hospedaje</A>
                        <A href="/cuenta/register" class="text-lucy-light font-work font-semibold text-lg hover:text-lucy-secondary transition-colors hover:underline hover:decoration-lucy-secondary drop-shadow-md drop-shadow-lucy-dark/30">Cuenta</A>
                        <Show when={props.children}>
                            <div class="pt-12">
                                {props.children}
                            </div>
                        </Show>
                    </div>
                </nav>
            </Show>
        </div>
    );
}