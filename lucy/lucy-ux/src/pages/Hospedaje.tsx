import { createSignal, createMemo, For } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation";

export default function Hospedaje() {
    const navigate = useNavigate();

    const [localidad, setLocalidad] = createSignal("");
    const [adults, setAdults] = createSignal(0);
    const [kids, setKids] = createSignal(0);
    const [rooms, setRooms] = createSignal(0);

    const [currentMonth, setCurrentMonth] = createSignal(new Date(2026, 7, 1)); // Empieza en Agosto 2026 como el mockup
    const [checkIn, setCheckIn] = createSignal<Date | null>(null);
    const [checkOut, setCheckOut] = createSignal<Date | null>(null);
    const [hoverDate, setHoverDate] = createSignal<Date | null>(null);

    const daysOfWeek = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

    const monthName = createMemo(() => {
        const name = currentMonth().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        return name.charAt(0).toUpperCase() + name.slice(1);
    });

    const calendarGrid = createMemo(() => {
        const year = currentMonth().getFullYear();
        const month = currentMonth().getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let firstDayIndex = new Date(year, month, 1).getDay();
        firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Ajustamos para que Lunes sea el primer día (0)

        const days: (Date | null)[] = [];
        // Rellenar espacios en blanco al inicio del mes
        for (let i = 0; i < firstDayIndex; i++) days.push(null);
        // Generar las fechas reales
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    });

    // Lógica de navegación de meses
    const handlePrevMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    // Lógica de selección de Check-In y Check-Out
    const handleDayClick = (date: Date) => {
        // Si no hay check-in, o si ya hay un rango completo, empezamos uno nuevo
        if (!checkIn() || (checkIn() && checkOut())) {
            setCheckIn(date);
            setCheckOut(null);
        }
        // Si ya hay check-in y se hace clic en una fecha posterior
        else if (date > checkIn()!) {
            setCheckOut(date);
        }
        // Si se hace clic en una fecha anterior al check-in, se reinicia como nuevo check-in
        else {
            setCheckIn(date);
        }
    };

    // Motor de estilos para pintar el rango en el calendario
    const getDayClass = (date: Date | null) => {
        if (!date) return "cursor-default opacity-0"; // Días en blanco

        const time = date.getTime();
        const inTime = checkIn()?.getTime();
        const outTime = checkOut()?.getTime();
        const hTime = hoverDate()?.getTime();

        const baseClass = "flex items-center justify-center h-8 transition-colors cursor-pointer ";

        // Solo un día seleccionado
        if (inTime === time && !outTime) {
            return baseClass + "bg-[#FA7B55] text-lucy-dark font-bold rounded-md";
        }
        // Día de Check-in (con rango activo)
        if (inTime === time) {
            return baseClass + "bg-[#FA7B55] text-lucy-dark font-bold rounded-l-md";
        }
        // Día de Check-out
        if (outTime === time) {
            return baseClass + "bg-[#FA7B55] text-lucy-dark font-bold rounded-r-md";
        }
        // Días intermedios confirmados
        if (inTime && outTime && time > inTime && time < outTime) {
            return baseClass + "bg-[#9CD9E2]/80 text-lucy-dark font-semibold";
        }
        // Días intermedios virtuales (Hover estela azul)
        if (inTime && !outTime && hTime && time > inTime && time <= hTime) {
            return baseClass + "bg-[#9CD9E2]/40 text-white";
        }

        // Día normal
        return baseClass + "text-gray-300 hover:text-lucy-secondary hover:font-bold";
    };

    // Envío de formulario
    const handleSearch = (e: Event) => {
        e.preventDefault();
        const payload = {
            localidad: localidad(),
            adultos: adults(),
            ninos: kids(),
            habitaciones: rooms(),
            checkIn: checkIn()?.toISOString().split('T')[0] || "No definido",
            checkOut: checkOut()?.toISOString().split('T')[0] || "No definido",
        };
        console.log("🌐 [API MOCK] Payload de reserva procesado:", payload);
        navigate(`/resultados?q=${encodeURIComponent(localidad() || "Alojamiento")}`);
    };

    return (
        <div class="min-h-screen bg-lucy-dark text-white font-work flex flex-col justify-between relative pb-16">

            {/* Cabecera superior */}
            <div class="w-full max-w-6xl mx-auto px-8 pt-12 flex justify-between items-start h-20 shrink-0 z-50">
                <A href="/" class="text-white hover:text-lucy-secondary transition-colors mt-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </A>
                <Navigation class="relative mt-2" />
            </div>

            {/* Cuerpo del Formulario Asimetrico */}
            <form onSubmit={handleSearch} class="max-w-6xl w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4 flex-grow items-center">

                {/* COLUMNA IZQUIERDA */}
                <div class="lg:col-span-6 space-y-12">

                    <div class="space-y-4">
                        <h2 class="text-3xl font-fira font-bold tracking-wide">¿A dónde vas?</h2>
                        <div class="relative max-w-md">
                            <select
                                value={localidad()}
                                onChange={(e) => setLocalidad(e.currentTarget.value)}
                                class="w-full bg-[#E5E5E5] text-lucy-dark font-medium rounded-xl p-4 pr-12 appearance-none outline-none border-none text-base cursor-pointer shadow-lg"
                            >
                                <option value="" disabled selected>Selecciona una localidad</option>
                                <option value="Amecameca">Amecameca</option>
                                <option value="Texcoco">Texcoco</option>
                                <option value="Tepetlixpa">Tepetlixpa</option>
                            </select>
                            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-lucy-dark pointer-events-none text-xl">▼</div>
                        </div>
                        <p class="text-sm text-gray-400 pl-1">
                            ¿No sabes qué visitar? <A href="/explorar" class="text-lucy-secondary font-semibold hover:underline">Explora</A>
                        </p>
                    </div>

                    <div class="space-y-6">
                        <h2 class="text-3xl font-fira font-bold tracking-wide">¿Con quién vas?</h2>

                        {/* Contadores */}
                        {[
                            { label: "Adultos", sub: "Ingresa el número de adultos", value: adults, setter: setAdults },
                            { label: "Niños", sub: "Ingresa el número de menores de 12 años", value: kids, setter: setKids },
                            { label: "Habitaciones", sub: "Ingresa el número de habitaciones", value: rooms, setter: setRooms }
                        ].map((counter) => (
                            <div class="flex items-center justify-between max-w-md bg-transparent py-2">
                                <div>
                                    <h4 class="text-xl font-bold">{counter.label}</h4>
                                    <p class="text-xs text-gray-400">{counter.sub}</p>
                                </div>
                                <div class="flex items-center gap-3">
                                    <button type="button" onClick={() => counter.setter(prev => prev + 1)} class="w-8 h-8 rounded-full bg-[#E5E5E5] text-lucy-dark font-bold text-xl flex items-center justify-center hover:bg-white active:scale-95 cursor-pointer">+</button>
                                    <div class="bg-[#E5E5E5] text-lucy-dark font-fira font-bold w-16 text-center py-1.5 rounded-xl text-base">{counter.value()}</div>
                                    <button type="button" onClick={() => counter.setter(prev => Math.max(0, prev - 1))} class="w-8 h-8 rounded-full bg-[#E5E5E5] text-lucy-dark font-bold text-xl flex items-center justify-center hover:bg-white active:scale-95 cursor-pointer">-</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Columna Derecha */}
                <div class="lg:col-span-6 flex flex-col items-center lg:items-end justify-center space-y-6">
                    <div class="w-full max-w-sm text-center">
                        <h2 class="text-3xl font-fira font-bold tracking-wide mb-6">¿Cuándo vas?</h2>

                        <div class="flex justify-between items-center px-4 mb-2">
                            <button type="button" onClick={handlePrevMonth} class="text-white hover:text-lucy-secondary text-2xl transition-colors cursor-pointer">‹</button>
                            <h3 class="text-2xl font-fira font-bold tracking-wide">{monthName()}</h3>
                            <button type="button" onClick={handleNextMonth} class="text-white hover:text-lucy-secondary text-2xl transition-colors cursor-pointer">›</button>
                        </div>

                        <p class="text-xs text-gray-400 mb-6">Selecciona las fechas de tu check-in y check-out</p>

                        <div class="w-full bg-transparent p-2">
                            <div class="grid grid-cols-7 gap-y-2 mb-4 text-sm font-semibold text-gray-300">
                                <For each={daysOfWeek}>{(day) => <div>{day}</div>}</For>
                            </div>

                            {/* Matriz del Calendario Reactivo */}
                            <div class="grid grid-cols-7 gap-y-3 text-sm font-fira" onMouseLeave={() => setHoverDate(null)}>
                                <For each={calendarGrid()}>
                                    {(date) => (
                                        <div
                                            class={getDayClass(date)}
                                            onClick={() => date && handleDayClick(date)}
                                            onMouseEnter={() => date && setHoverDate(date)}
                                        >
                                            {date ? date.getDate().toString().padStart(2, '0') : ""}
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>

                    </div>
                </div>

            </form>

            <div class="w-full max-w-6xl mx-auto px-8 flex justify-end mt-8">
                <button
                    type="submit"
                    onClick={handleSearch}
                    class="bg-lucy-primary text-lucy-dark font-fira font-bold px-10 py-4 rounded-full flex items-center gap-2 hover:bg-white transition-all shadow-2xl transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                    Buscar habitación <span>➔</span>
                </button>
            </div>

        </div>
    );
}