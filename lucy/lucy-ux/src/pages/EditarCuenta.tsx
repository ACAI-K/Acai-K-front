import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function EditarCuenta() {
    const navigate = useNavigate();
    const [nombre, setNombre] = createSignal("");
    const [apellido, setApellido] = createSignal("");
    const [email, setEmail] = createSignal("");
    const [contrasena, setContrasena] = createSignal("");
    const [mostrarContrasena, setMostrarContrasena] = createSignal(false);
    const [telefono, setTelefono] = createSignal("");
    const [fechaNacimiento, setFechaNacimiento] = createSignal("");

    const handleConfirmar = () => {
        // Validar campos
        if (!nombre() || !apellido() || !email() || !contrasena() || !telefono()) {
            alert("Por favor completa todos los campos");
            return;
        }
        // Aquí iría la lógica para actualizar la cuenta
        console.log({
            nombre: nombre(),
            apellido: apellido(),
            email: email(),
            contrasena: contrasena(),
            telefono: telefono(),
            fechaNacimiento: fechaNacimiento(),
        });
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
                    <div class="flex items-center justify-between mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            class="text-lucy-dark hover:opacity-70 transition-opacity"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button class="text-lucy-dark hover:opacity-70 transition-opacity">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <h1 class="text-lucy-dark text-4xl md:text-5xl font-bold font-fira text-center">
                        Editar
                    </h1>
                </div>
            </header>

            {/* Contenido Principal */}
            <main class="max-w-2xl mx-auto p-8">
                <div class="space-y-6">
                    {/* Nombre */}
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre()}
                            onInput={(e) => setNombre(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Apellido */}
                    <div>
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            value={apellido()}
                            onInput={(e) => setApellido(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="kyuspe23@gmail.me"
                            value={email()}
                            onInput={(e) => setEmail(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Contraseña */}
                    <div class="relative">
                        <input
                            type={mostrarContrasena() ? "text" : "password"}
                            placeholder="82temY63Vax%Ny"
                            value={contrasena()}
                            onInput={(e) => setContrasena(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work pr-12"
                        />
                        <button
                            onClick={() => setMostrarContrasena(!mostrarContrasena())}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-lucy-dark hover:opacity-70 transition-opacity"
                        >
                            {mostrarContrasena() ? (
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3 3m4.753 4.753L19 19M9.172 5.172L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div>
                        <input
                            type="date"
                            value={fechaNacimiento()}
                            onInput={(e) => setFechaNacimiento(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Teléfono */}
                    <div>
                        <input
                            type="tel"
                            placeholder="506 243 7230"
                            value={telefono()}
                            onInput={(e) => setTelefono(e.currentTarget.value)}
                            class="w-full bg-lucy-light text-lucy-dark px-6 py-3 rounded-lg text-base placeholder-lucy-dark/60 focus:outline-none focus:ring-2 focus:ring-lucy-secondary font-work"
                        />
                    </div>

                    {/* Botón Confirmar */}
                    <div class="flex justify-center pt-6">
                        <button
                            onClick={handleConfirmar}
                            class="inline-flex items-center gap-2 bg-lucy-secondary text-lucy-dark px-8 py-3 rounded-full font-fira font-bold hover:bg-lucy-secondary/80 transition-colors shadow-lg"
                        >
                            Confirmar
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
