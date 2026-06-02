import { A, useNavigate } from "@solidjs/router";
import { LucyButton } from "../components/LucyButton";
import ChvronRight from "lucide-solid/icons/chevron-right";
export default function MenuAdmin() {
    const navigate = useNavigate();
    const nombreHotel = "Pambacito Delux"; // Este valor podría venir de parámetros o estado

    return (
        <div class="h-screen text-lucy-light flex flex-col mt-8 mx-auto w-[70dvw]">
            <div class="flex flex-col items-center md:items-start gap-2">
                <h1 class="text-lucy-light text-3xl font-fira font-base text-center md:text-left w-full">
                    Hola administrador de:
                </h1>
                <p class="text-lucy-light/60 text-4xl font-work my-2 font-bold">
                    Hotel "{nombreHotel}"
                </p>
            </div>
            
            {/* Menú Principal */}
            <main class="p-8 flex flex-col gap-4">
                    <LucyButton ButtonLink="/mapa" ButtonText="Mapa" ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChvronRight size={50}/>} class="text-md lg:text-4xl"/>
                    <LucyButton ButtonLink="/admin/registro-ldd" ButtonText="Regisstro LDD" ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChvronRight size={50}/>} class="text-md lg:text-4xl"/>
                    <LucyButton ButtonLink="/admin/tickets" ButtonText="Tickets" ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChvronRight size={50}/>} class="text-md lg:text-4xl"/>
            </main>
        </div>
    );
}
