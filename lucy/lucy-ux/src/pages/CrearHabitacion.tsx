import { createSignal } from "solid-js";

export default function CrearHabitacion() {
    const [nombreLugar, setNombreLugar] = createSignal("");
    const [descripcion, setDescripcion] = createSignal("");
    const [maxPersonas, setMaxPersonas] = createSignal(0);
    const [camasIndividuales, setCamasIndividuales] = createSignal(0);
    const [camasMatrimoniales, setCamasMatrimoniales] = createSignal(0);
    const [camasQueen, setCamasQueen] = createSignal(0);
    const [camasKing, setCamasKing] = createSignal(0);
    const [precioPorNoche, setPrecioPorNoche] = createSignal(0);

    const incrementar = (setter: (n: number) => void, value: number) => {
        setter(value + 1);
    };

    const decrementar = (setter: (n: number) => void, value: number) => {
        if (value > 0) setter(value - 1);
    };

    const handleNumInput = (value: string, max?: number) => {
        const num = parseInt(value) || 0;
        return max ? Math.min(num, max) : num;
    };

    return (
        <div class="min-h-screen bg-lucy-dark">
            {/* Header */}
            <header class="bg-lucy-primary relative overflow-hidden">
                <div class="absolute inset-0 opacity-20 pointer-events-none">
                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" stroke-width="2" />
                        <line x1="100%" y1="0" x2="0" y2="100%" stroke="white" stroke-width="2" />
                    </svg>
                </div>

                <div class="max-w-6xl mx-auto p-8 pt-12 pb-16 relative z-10">
                    <h1 class="text-lucy-dark text-2xl md:text-3xl font-work font-semibold">
                        Crear Habitación / Plan de estadía
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-5xl mx-auto p-8">
                <div class="space-y-8">
                    {/* Nombre del lugar */}
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre del lugar"
                            value={nombreLugar()}
                            onInput={(e) => setNombreLugar(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                        />
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Izquierda: Descripción y Camas */}
                        <div class="lg:col-span-2 space-y-8">
                            {/* Descripción */}
                            <div>
                                <textarea
                                    placeholder="Descripción"
                                    value={descripcion()}
                                    onInput={(e) => setDescripcion(e.currentTarget.value)}
                                    class="w-full bg-lucy-light text-lucy-dark px-4 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-primary h-32 resize-none"
                                >
                                </textarea>
                                <p class="text-lucy-light/50 text-xs mt-2 text-right">
                                    {descripcion().length}/350
                                </p>
                            </div>

                            {/* Número de Camas */}
                            <div>
                                <h3 class="text-lucy-light text-lg font-fira font-bold mb-6">
                                    Número de camas
                                </h3>
                                <div class="space-y-6">
                                    {/* Individuales */}
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-lucy-light font-work font-semibold">Individuales</p>
                                            <p class="text-lucy-light/50 text-sm">Ingresa el número de camas individuales</p>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <button
                                                onClick={() => decrementar(setCamasIndividuales, camasIndividuales())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={camasIndividuales()}
                                                onInput={(e) => setCamasIndividuales(handleNumInput(e.currentTarget.value, 9))}
                                                class="w-12 bg-lucy-light text-lucy-dark text-center py-1 rounded focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                                            />
                                            <button
                                                onClick={() => incrementar(setCamasIndividuales, camasIndividuales())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Matrimoniales */}
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-lucy-light font-work font-semibold">Matrimoniales</p>
                                            <p class="text-lucy-light/50 text-sm">Ingresa el número de camas matrimoniales</p>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <button
                                                onClick={() => decrementar(setCamasMatrimoniales, camasMatrimoniales())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={camasMatrimoniales()}
                                                onInput={(e) => setCamasMatrimoniales(handleNumInput(e.currentTarget.value, 9))}
                                                class="w-12 bg-lucy-light text-lucy-dark text-center py-1 rounded focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                                            />
                                            <button
                                                onClick={() => incrementar(setCamasMatrimoniales, camasMatrimoniales())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Queen */}
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-lucy-light font-work font-semibold">Queen</p>
                                            <p class="text-lucy-light/50 text-sm">Ingresa el número de camas queen</p>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <button
                                                onClick={() => decrementar(setCamasQueen, camasQueen())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={camasQueen()}
                                                onInput={(e) => setCamasQueen(handleNumInput(e.currentTarget.value, 9))}
                                                class="w-12 bg-lucy-light text-lucy-dark text-center py-1 rounded focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                                            />
                                            <button
                                                onClick={() => incrementar(setCamasQueen, camasQueen())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* King */}
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <p class="text-lucy-light font-work font-semibold">King</p>
                                            <p class="text-lucy-light/50 text-sm">Ingresa el número de camas king</p>
                                        </div>
                                        <div class="flex items-center gap-3">
                                            <button
                                                onClick={() => decrementar(setCamasKing, camasKing())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                value={camasKing()}
                                                onInput={(e) => setCamasKing(handleNumInput(e.currentTarget.value, 9))}
                                                class="w-12 bg-lucy-light text-lucy-dark text-center py-1 rounded focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                                            />
                                            <button
                                                onClick={() => incrementar(setCamasKing, camasKing())}
                                                class="w-8 h-8 bg-lucy-light/10 text-lucy-light rounded flex items-center justify-center hover:bg-lucy-light/20 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Derecha: Máximo Personas y Precio */}
                        <div class="space-y-8">
                            {/* Máximo de Personas */}
                            <div>
                                <p class="text-lucy-light font-work font-semibold mb-2">
                                    Máximo de Personas
                                </p>
                                <p class="text-lucy-light/50 text-sm mb-4">
                                    Ingresa el número máximo de personas por habitación
                                </p>
                                <div class="flex items-center justify-center gap-4">
                                    <button
                                        onClick={() => decrementar(setMaxPersonas, maxPersonas())}
                                        class="w-10 h-10 bg-lucy-light/10 text-lucy-light rounded-full flex items-center justify-center hover:bg-lucy-light/20 transition-colors text-lg"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={maxPersonas()}
                                        onInput={(e) => setMaxPersonas(handleNumInput(e.currentTarget.value))}
                                        class="w-16 bg-lucy-light text-lucy-dark text-center py-2 rounded focus:outline-none focus:ring-2 focus:ring-lucy-primary text-lg"
                                    />
                                    <button
                                        onClick={() => incrementar(setMaxPersonas, maxPersonas())}
                                        class="w-10 h-10 bg-lucy-light/10 text-lucy-light rounded-full flex items-center justify-center hover:bg-lucy-light/20 transition-colors text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Precio por Noche */}
                            <div>
                                <p class="text-lucy-light font-work font-semibold mb-2">
                                    Precio por noche
                                </p>
                                <p class="text-lucy-light/50 text-sm mb-4">
                                    Ingresa el precio por noche (MXN)
                                </p>
                                <div class="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={precioPorNoche()}
                                        onInput={(e) => setPrecioPorNoche(parseFloat(e.currentTarget.value) || 0)}
                                        placeholder="0.00"
                                        class="flex-1 bg-lucy-light text-lucy-dark px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-lucy-primary"
                                    />
                                    <span class="text-lucy-light font-fira text-sm">MXN</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botón Crear */}
                    <div class="flex justify-center pt-8">
                        <button class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary transition-colors shadow-lg">
                            Crear
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
