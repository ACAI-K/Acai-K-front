// src/pages/Explorar.tsx
import { Navigation } from "../components/Navigation";
import { LucyButton } from "../components/LucyButton";
import ChevronRight from 'lucide-solid/icons/chevron-right';
import ChevronLeft from 'lucide-solid/icons/chevron-left';

export default function Explorar() {

    // Listas de locaciones separadas para cada columna
    const leftLocations = ["Amecameca", "Tlamanalco", "Texcoco", "Chalco"];
    const rightLocations = ["Ayapango", "Tepetlaoxtoc", "Ozumba"];
    // Cambiar a uso con los datos de muckup
    return (
        <div class="min-h-full bg-lucy-dark text-white flex flex-col font-fira w-full overflow-x-hidden">

            {/* Area central de locaciones */}
            <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-36 items-start p-16">

                {/* COLUMNA IZQUIERDA */}
                <div class="flex flex-col space-y-8 w-full max-w-lg">
                    <h2 class="text-3xl font-bold text-white mb-4 tracking-wide pl-6">
                        Selecciona locación
                    </h2>

                    {/* Resto de locaciones izquierdas */}
                    {leftLocations.map((loc) => (
                        <LucyButton ButtonLink={"/mapa"} ButtonText={loc} ButtonBackground="lucy-dark" ButtonForeground="lucy-primary" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChevronRight height={50} width={50}/>} />
                    ))}
                    {rightLocations.map((loc) => (
                        <div class="block lg:hidden">
                        <LucyButton ButtonLink={`/resultados?q=${loc}`} ButtonText={loc} ButtonBackground="lucy-dark" ButtonForeground="lucy-primary" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChevronRight height={50} width={50}/>} />
                        </div>
                    ))}
                </div>

                {/* COLUMNA DERECHA */}
                <div class="flex-col space-y-8 w-full max-w-lg lg:mt-32 ml-auto hidden lg:flex">
                    {/* Locaciones derechas */}
                    {rightLocations.map((loc) => (
                        <LucyButton ButtonLink={`/resultados?q=${loc}`} ButtonText={loc} ButtonBackground="lucy-dark" ButtonForeground="lucy-primary" ButtonSize="full" ButtonIconSide="left" ButtonIcon={<ChevronLeft height={50} width={50}/>} />
                    ))}
                </div>

            </div>
        </div>
    );
}