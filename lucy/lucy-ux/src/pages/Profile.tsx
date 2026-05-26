// src/pages/Profile.tsx
import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation";

type ProfileState = "menu" | "edit";

export default function Profile() {
    const [viewState, setViewState] = createSignal<ProfileState>("menu");
    const navigate = useNavigate();

    // Estados locales editables del perfil
    const [name, setName] = createSignal("Alejandro");
    const [lastName, setLastName] = createSignal("Jacome Delgado");
    const [email, setEmail] = createSignal("kyogre235@proton.me");
    const [password, setPassword] = createSignal("82enY5$DA@0Vy");
    const [phone, setPhone] = createSignal("605 243 1230");

    const handleUpdateProfile = (e: Event) => {
        e.preventDefault();
        console.log("🌐 [API MOCK] PUT a /api/users/profile/", {
            name: name(), lastName: lastName(), email: email(), phone: phone()
        });
        setViewState("menu");
    };

    return (
        <div class="min-h-screen bg-lucy-dark text-white flex flex-col justify-between font-work w-full">
            {/* Barra superior de navegacion */}
            <div class="w-full max-w-6xl mx-auto px-8 pt-16 flex justify-between items-start h-24 shrink-0 z-50">
                <button
                    onClick={() => {
                        if (viewState() === "edit") setViewState("menu");
                        else navigate("/");
                    }}
                    class="text-white hover:text-lucy-secondary transition-colors cursor-pointer mt-2"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </button>

                <Navigation class="relative mt-2" />
            </div>

            {/* area de visualizacion central */}
            <div class="flex-grow w-full flex items-center justify-start max-w-6xl mx-auto p-8 min-h-[500px]">

                {/* Menu deAcciones */}
                <Show when={viewState() === "menu"}>
                    <div class="w-full max-w-xl flex flex-col space-y-8 animate-fade-in text-left items-start">

                        <h2 class="text-4xl md:text-5xl font-fira font-bold text-white tracking-wide mb-6 pl-4">
                            ¡Hola!
                        </h2>

                        {/* Mis reservas */}
                        <A
                            href="/reservas"
                            class="w-full bg-lucy-primary text-lucy-dark p-6 rounded-tl-[40px] rounded-br-[40px] flex justify-between items-center hover:bg-white transition-all shadow-xl group transform hover:-translate-y-0.5"
                        >
                            <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">Mis reservas</span>
                            <span class="text-3xl font-fira font-bold group-hover:translate-x-2 transition-transform">➔</span>
                        </A>

                        {/* Editar perfil */}
                        <button
                            onClick={() => setViewState("edit")}
                            class="w-full text-left bg-transparent p-6 flex justify-between items-center hover:text-lucy-secondary transition-colors group cursor-pointer"
                        >
                            <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">Editar perfil</span>
                            <span class="text-3xl font-fira font-bold group-hover:translate-x-2 transition-transform">➔</span>
                        </button>

                        {/* Soporte */}
                        <A
                            href="/soporte"
                            class="w-full text-left bg-transparent p-6 flex justify-between items-center hover:text-lucy-secondary transition-colors group"
                        >
                            <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">Soporte</span>
                            <span class="text-3xl font-fira font-bold group-hover:translate-x-2 transition-transform">➔</span>
                        </A>

                        {/* Cerrar sesión */}
                        <A
                            href="/cuenta"
                            class="w-full text-left bg-transparent p-6 flex justify-between items-center hover:text-red-400 transition-colors group"
                        >
                            <span class="text-3xl md:text-4xl font-fira font-bold tracking-tight">Cerrar sesión</span>
                            <span class="text-3xl font-fira font-bold group-hover:translate-x-2 transition-transform">➔</span>
                        </A>
                    </div>
                </Show>

                {/* EditarPerfil */}
                <Show when={viewState() === "edit"}>
                    <form onSubmit={handleUpdateProfile} class="w-full max-w-xl flex flex-col justify-center space-y-5 py-6 animate-fade-in pl-4">
                        <h2 class="text-4xl font-fira font-bold text-left text-white mb-4">Editar</h2>
                        <input type="text" value={name()} required class="w-full text-lucy-dark rounded-xl p-4 outline-none border-none text-base font-medium shadow-inner" style="background-color: #E5E5E5;" onInput={(e) => setName(e.currentTarget.value)}/>
                        <input type="text" value={lastName()} required class="w-full text-lucy-dark rounded-xl p-4 outline-none border-none text-base font-medium shadow-inner" style="background-color: #E5E5E5;" onInput={(e) => setLastName(e.currentTarget.value)}/>
                        <input type="email" value={email()} required class="w-full text-lucy-dark rounded-xl p-4 outline-none border-none text-base font-medium shadow-inner" style="background-color: #E5E5E5;" onInput={(e) => setEmail(e.currentTarget.value)}/>
                        <div class="relative w-full">
                            <input type="password" value={password()} required class="w-full text-lucy-dark rounded-xl p-4 pr-12 outline-none border-none text-base font-medium shadow-inner" style="background-color: #E5E5E5;" onInput={(e) => setPassword(e.currentTarget.value)}/>
                            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-lucy-dark opacity-60">👁</span>
                        </div>
                        <div class="grid grid-cols-4 gap-3 w-full">
                            <div class="col-span-1 text-lucy-dark rounded-xl p-4 flex items-center justify-between text-base font-medium" style="background-color: #E5E5E5;">
                                <span>+1</span><span>🇺🇸</span>
                            </div>
                            <input type="tel" value={phone()} required class="col-span-3 text-lucy-dark rounded-xl p-4 outline-none border-none text-base font-medium shadow-inner" style="background-color: #E5E5E5;" onInput={(e) => setPhone(e.currentTarget.value)}/>
                        </div>
                        <div class="flex justify-start pt-4">
                            <button type="submit" class="bg-lucy-primary text-lucy-dark font-fira font-bold px-12 py-4 rounded-full flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-xl active:scale-95 cursor-pointer">
                                Confirmar <span>➔</span>
                            </button>
                        </div>
                    </form>
                </Show>

            </div>

            <div class="h-16 shrink-0 w-full"></div>

        </div>
    );
}