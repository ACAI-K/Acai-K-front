import { createSignal } from "solid-js";

export default function RegistroLDD() {
    const [archivo, setArchivo] = createSignal<File | null>(null);

    const handleFileChange = (e: Event) => {
        const input = e.currentTarget as HTMLInputElement;
        if (input.files?.[0]) {
            setArchivo(input.files[0]);
        }
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
                    <h1 class="text-lucy-dark text-4xl md:text-5xl font-bold font-fira">
                        Registro de LDD's
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-2xl mx-auto p-8 flex items-center justify-center min-h-[60vh]">
                <div class="w-full space-y-8">
                    {/* Área de Carga de Archivo */}
                    <div
                        class="bg-lucy-light/10 border-2 border-dashed border-lucy-light/40 rounded-lg p-12 text-center cursor-pointer hover:border-lucy-light/60 transition-colors"
                        onClick={() => document.getElementById("file-input")?.click()}
                    >
                        <input
                            id="file-input"
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            class="hidden"
                        />
                        <svg class="w-12 h-12 mx-auto mb-4 text-lucy-light/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="text-lucy-light font-work font-semibold text-base">
                            Sube el archivo json con la lista autorizada de correos justo con su key
                        </p>
                        {archivo() && (
                            <p class="text-lucy-secondary text-sm mt-2">
                                Archivo seleccionado: {archivo()!.name}
                            </p>
                        )}
                    </div>

                    {/* Texto Informativo */}
                    <div class="text-center">
                        <p class="text-lucy-light/70 font-work text-sm">
                            Si hay una actualización de datos, vuelve a subir la lista completa con los datos modificados.
                            <br />
                            Lucy hará el resto
                        </p>
                    </div>

                    {/* Botón Enviar */}
                    <div class="flex justify-center">
                        <button class="inline-flex items-center gap-2 bg-lucy-primary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary transition-colors shadow-lg">
                            Enviar
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
