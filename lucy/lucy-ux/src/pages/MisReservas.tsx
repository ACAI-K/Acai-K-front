import { useNavigate } from "@solidjs/router";
import { For } from "solid-js";

type Reserva = {
    id: string;
    nombre: string;
    tipo: string;
    calificacion: number;
    imagen: string;
    amenidades: string[];
    direccion: string;
    fechaInicio: string;
    fechaFin: string;
    personas: number;
    ninos: number;
    codigoReserva: string;
    amenaceaText: string;
};

const RESERVAS_MOCK: Reserva[] = [
    {
        id: "1",
        nombre: "Refugio de los Menhires",
        tipo: "Habitaciones",
        calificacion: 5,
        imagen: "",
        amenidades: ["wifi", "camera", "bed"],
        direccion: "Amenacameca, C. insurgente u-348 L11",
        fechaInicio: "Del 01 al 06",
        fechaFin: "de agosto de 2026",
        personas: 5,
        ninos: 2,
        codigoReserva: "ZXY1-ABCI-TYU2",
        amenaceaText: "Amenacameca",
    },
    {
        id: "2",
        nombre: 'Cabañas "El Abuelo"',
        tipo: "Cabañas",
        calificacion: 4,
        imagen: "",
        amenidades: ["wifi", "camera", "tv", "accessibility"],
        direccion: 'Cerca de Parque Ecológico "El Manantial"',
        fechaInicio: "Del 07 al 13",
        fechaFin: "de agosto de 2026",
        personas: 4,
        ninos: 2,
        codigoReserva: "ABC1-DEF2-HIJ3",
        amenaceaText: "Amenacameca",
    },
];

export default function MisReservas() {
    const navigate = useNavigate();

    const renderCalificacion = (calificacion: number) => {
        return (
            <div class="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        class={`w-4 h-4 ${star <= calificacion ? "text-lucy-secondary" : "text-lucy-light/30"}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                    </svg>
                ))}
            </div>
        );
    };

    const renderAmenidades = (amenidades: string[]) => {
        const iconMap = {
            wifi: (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
            ),
            camera: (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            bed: (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            ),
            tv: (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                </svg>
            ),
            accessibility: (
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        };
        return amenidades.slice(0, 4).map((amenidad) => (
            <div class="text-lucy-light/70 hover:text-lucy-secondary transition-colors" title={amenidad}>
                {iconMap[amenidad as keyof typeof iconMap] || <span class="text-sm">{amenidad}</span>}
            </div>
        ));
    };

    return (
        <div class="h-fit text-lucy-light flex flex-col mt-8 mx-auto w-[70dvw]">
            <h1 class="text-lucy-light text-4xl md:text-5xl font-bold font-fira">
                Mis Reservas
            </h1>

            {/* Contenido Principal */}
            <main class=" flex flex-col mx-auto p-8 gap-8">
                    <For each={RESERVAS_MOCK}>
                        {(reserva) => (
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 bg-lucy-light/5 border border-lucy-light/10 rounded-lg p-6 hover:border-lucy-light/20 transition-colors">
                                {/* Imagen */}
                                <div class="md:col-span-1">
                                    <div class="w-full aspect-video bg-lucy-light/10 border border-lucy-light/20 rounded-lg overflow-hidden">
                                        <img
                                            src={reserva.imagen}
                                            alt={reserva.nombre}
                                            class="w-full h-full object-cover"
                                            onError={(e) => {
                                                const img = e.currentTarget as HTMLImageElement;
                                                img.style.display = "none";
                                            }}
                                        />
                                        <svg class="w-full h-full opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div class="md:col-span-3 space-y-4">
                                    {/* Nombre y Tipo */}
                                    <div>
                                        <h3 class="text-lucy-light text-xl font-fira font-bold">
                                            {reserva.nombre}
                                        </h3>
                                        <p class="text-lucy-light/60 text-sm font-work">
                                            {reserva.tipo}
                                        </p>
                                    </div>

                                    {/* Calificación y Amenidades */}
                                    <div class="space-y-2">
                                        <div>{renderCalificacion(reserva.calificacion)}</div>
                                        <div class="flex gap-3">
                                            {renderAmenidades(reserva.amenidades)}
                                        </div>
                                    </div>

                                    {/* Dirección y Amenaceamento */}
                                    <div>
                                        <p class="text-lucy-light/70 text-sm font-work">
                                            {reserva.amenaceaText}
                                        </p>
                                        <p class="text-lucy-light/60 text-xs font-work">
                                            {reserva.direccion}
                                        </p>
                                    </div>

                                    {/* Fechas y Personas */}
                                    <div class="flex flex-col md:flex-row md:items-center md:justify-between pt-4 border-t border-lucy-light/10">
                                        <div class="space-y-2 mb-4 md:mb-0">
                                            <p class="text-lucy-light/60 text-sm font-work">
                                                Reserva
                                            </p>
                                            <p class="text-lucy-light text-sm font-work">
                                                {reserva.fechaInicio} {reserva.fechaFin}
                                            </p>
                                            <p class="text-lucy-light/60 text-xs font-work">
                                                {reserva.personas} Adultos, {reserva.ninos} Niños
                                            </p>
                                        </div>

                                        {/* Código de Reserva */}
                                        <button class="px-4 py-2 bg-lucy-primary text-lucy-dark font-fira font-bold text-sm hover:bg-lucy-primary/80 transition-colors rounded-br-4xl rounded-tl-4xl" onClick={() => navigate(`/reservas/${reserva.id}`)}>
                                            {reserva.codigoReserva}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>
            </main>
        </div>
    );
}
