import { createSignal, Show, onMount, onCleanup } from "solid-js";
import X from 'lucide-solid/icons/x';
import Menu from 'lucide-solid/icons/menu';
import { LucyButton, LucyIconButtonNoA } from "./LucyButton";
import { useNavigate } from "@solidjs/router";
import ArrowLeft from "lucide-solid/icons/arrow-left";

export function Navigation(props: { class?: string }) {
    const navigate = useNavigate();
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
        <div class={`${props.class || ""}`}>
            <div class="fixed top-4 left-4 z-100">
            <LucyIconButtonNoA onClick={() => {navigate(-1)}} ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIcon={<ArrowLeft size={30}/>} class="w-25 drop-shadow-xl drop-shadow-lucy-dark/40"/>
            </div>
            <div class="fixed top-4 right-4 z-100">
                <Show when={isOpen()}>
                    <nav class="text-right flex flex-col items-end gap-4 animate-fade-in duration-10">
                        <LucyIconButtonNoA onClick={() => setIsOpen(false)} ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIcon={<X size={30}/>} class="w-25 drop-shadow-xl drop-shadow-lucy-dark/40"/>
                        <div class="flex flex-col items-end space-y-1">
                            <LucyButton ButtonLink={"/"} ButtonBackground="lucy-dark" ButtonText="Inicio" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="left" />
                            <LucyButton ButtonLink={"/explorar"} ButtonBackground="lucy-dark" ButtonText="Explorar" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="left" />
                            <LucyButton ButtonLink={"/hospedaje"} ButtonBackground="lucy-dark" ButtonText="Hospedaje" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="left" />
                            <LucyButton ButtonLink={"/cuenta/login"} ButtonBackground="lucy-dark" ButtonText="Cuenta" ButtonForeground="lucy-light" ButtonSize="md" ButtonIconSide="left" />
                        </div>
                    </nav>
                </Show>
                <Show when={!isOpen()}>
                    <LucyIconButtonNoA onClick={() => setIsOpen(true)} ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIcon={<Menu size={30}/>} class="w-25 drop-shadow-xl drop-shadow-lucy-dark/40"/>
                </Show>
            </div>
                        
        </div>
    );
}