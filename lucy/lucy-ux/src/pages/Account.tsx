import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";

export default function Account() {
    const [isLogin, setIsLogin] = createSignal(true);
    const navigate = useNavigate();

    const [email, setEmail] = createSignal("");
    const [password, setPassword] = createSignal("");
    const [name, setName] = createSignal("Alejandro");
    const [lastName, setLastName] = createSignal("Jacome Delgado");
    const [phone, setPhone] = createSignal("605 243 1230");

    const handleLogin = (e: Event) => {
        e.preventDefault();
        console.log("🌐 [API MOCK] POST a /api/token/", { email: email(), password: password() });
        navigate("/perfil");
    };

    const handleRegister = (e: Event) => {
        e.preventDefault();
        console.log("🌐 [API MOCK] POST a /api/users/", {
            name: name(),
            lastName: lastName(),
            email: email(),
            password: password(),
            phone: phone()
        });
        navigate("/perfil");
    };

    return (
        <div class="fixed inset-0 z-50 bg-lucy-dark text-white flex flex-col justify-between font-work h-screen w-screen overflow-y-auto">

            {/* Boton superior izquierdo para regresar al Home */}
            <div class="w-full max-w-6xl mx-auto px-8 pt-8 flex justify-start items-center h-16 shrink-0">
                <A href="/" class="text-white hover:text-lucy-secondary transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                </A>
            </div>

            {/* Area central del formulario */}
            <div class="flex-grow w-full flex items-center justify-center p-6 min-h-[500px]">

                {/* --- INICIAR SESION --- */}
                <Show when={isLogin()}>
                    <div class="w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl border border-gray-800/60 grid grid-cols-1 md:grid-cols-2 min-h-[420px]" style="background-color: #262325;">
                        <div class="relative rounded-tl-[40px] rounded-bl-[40px] hidden md:block" style="background-color: #7F6A2C;">
                            <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" stroke-width="2" />
                                <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" stroke-width="2" />
                            </svg>
                        </div>
                        <form onSubmit={handleLogin} class="p-12 flex flex-col justify-center space-y-6 w-full">
                            <h2 class="text-3xl font-fira font-bold text-white mb-2">Iniciar Sesion</h2>
                            <input
                                type="email" placeholder="Email" required
                                class="w-full text-lucy-dark placeholder-gray-500 rounded-xl p-4 outline-none border-none text-base font-medium"
                                style="background-color: #E5E5E5;"
                                onInput={(e) => setEmail(e.currentTarget.value)}
                            />
                            <div class="relative w-full">
                                <input
                                    type="password" placeholder="Contraseña" required
                                    class="w-full text-lucy-dark placeholder-gray-500 rounded-xl p-4 pr-12 outline-none border-none text-base font-medium"
                                    style="background-color: #E5E5E5;"
                                    onInput={(e) => setPassword(e.currentTarget.value)}
                                />
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-lucy-dark opacity-60 cursor-pointer">👁</span>
                            </div>
                            <div class="flex justify-end pt-2">
                                <button type="submit" class="bg-lucy-primary text-lucy-dark font-fira font-bold px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer">
                                    Iniciar sesión <span>➔</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Show>

                {/* --- CREA UNA CUENTA --- */}
                <Show when={!isLogin()}>
                    <div class="w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl border border-gray-800/60 grid grid-cols-1 md:grid-cols-2 min-h-[500px]" style="background-color: #262325;">
                        <div class="relative rounded-tl-[40px] rounded-bl-[40px] hidden md:block" style="background-color: #3B5461;">
                            <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" stroke-width="2" />
                                <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" stroke-width="2" />
                            </svg>
                        </div>
                        <form onSubmit={handleRegister} class="p-12 flex flex-col justify-center space-y-4 w-full">
                            <h2 class="text-3xl font-fira font-bold text-white mb-2">Crea una cuenta</h2>
                            <input type="text" placeholder="Nombre" required value={name()} class="w-full text-lucy-dark placeholder-gray-500 rounded-xl p-3.5 outline-none border-none text-base font-medium" style="background-color: #E5E5E5;" onInput={(e) => setName(e.currentTarget.value)}/>
                            <input type="text" placeholder="Apellidos" required value={lastName()} class="w-full text-lucy-dark placeholder-gray-500 rounded-xl p-3.5 outline-none border-none text-base font-medium" style="background-color: #E5E5E5;" onInput={(e) => setLastName(e.currentTarget.value)}/>
                            <input type="email" placeholder="Email" required class="w-full text-lucy-dark placeholder-gray-500 rounded-xl p-3.5 outline-none border-none text-base font-medium" style="background-color: #E5E5E5;" onInput={(e) => setEmail(e.currentTarget.value)}/>
                            <div class="relative w-full">
                                <input type="password" placeholder="Contraseña" required class="w-full text-lucy-dark placeholder-gray-500 rounded-xl p-3.5 pr-12 outline-none border-none text-base font-medium" style="background-color: #E5E5E5;" onInput={(e) => setPassword(e.currentTarget.value)}/>
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-lucy-dark opacity-60">👁</span>
                            </div>
                            <div class="grid grid-cols-3 gap-3 w-full">
                                <div class="col-span-1 text-lucy-dark rounded-xl p-3.5 flex items-center justify-between text-base font-medium select-none" style="background-color: #E5E5E5;">
                                    <span>+1</span><span>🇺🇸</span>
                                </div>
                                <input type="tel" placeholder="Teléfono" required value={phone()} class="col-span-2 text-lucy-dark placeholder-gray-500 rounded-xl p-3.5 outline-none border-none text-base font-medium" style="background-color: #E5E5E5;" onInput={(e) => setPhone(e.currentTarget.value)}/>
                            </div>
                            <div class="flex justify-end pt-2">
                                <button type="submit" class="bg-lucy-primary text-lucy-dark font-fira font-bold px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-white transition-all shadow-md active:scale-95 cursor-pointer">
                                    Crear <span>➔</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </Show>

            </div>

            {/* Barra inferior de alternancia */}
            <div class="w-full text-center pb-8 h-16 shrink-0">
                <p class="text-gray-400 text-lg">
                    <Show when={isLogin()} fallback={<>¿Ya tienes cuenta? <button type="button" onClick={() => setIsLogin(true)} class="text-lucy-secondary font-semibold hover:underline cursor-pointer bg-transparent border-none p-0">Iniciar sesión</button></>}>
                        ¿No tienes cuenta? <button type="button" onClick={() => setIsLogin(false)} class="text-lucy-secondary font-semibold hover:underline cursor-pointer bg-transparent border-none p-0">Crear cuenta</button>
                    </Show>
                </p>
            </div>

        </div>
    );
}