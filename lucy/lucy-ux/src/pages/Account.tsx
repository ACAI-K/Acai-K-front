import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import ChevronDown from "lucide-solid/icons/chevron-down";
import Eye from "lucide-solid/icons/eye";
import EyeClosed from "lucide-solid/icons/eye-closed";
import { LucyIconButton, LucyIconButtonNoA, LucyButtonNoA } from "../components/LucyButton";

type AccountProps = {
    loginOrRegister?: 'login' | 'register';
};

export default function Account(props: AccountProps) {
    const [isLogin, setIsLogin] = createSignal(props.loginOrRegister !== undefined && props.loginOrRegister === 'login');
    const navigate = useNavigate();

    const [isShowPassword, setShowPassword] = createSignal(false);
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
        <div class="bg-lucy-dark text-lucy-light flex flex-col justify-between font-work h-dvh w-dvw overflow-hidden mx-auto">
            <Navigation/>
            {/* Boton superior izquierdo para regresar al Home */}
            <LucyIconButton ButtonLink='/' ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIcon={<ArrowLeft size={30}/>} class="z-50 max-w-fit" />

            {/* Area central del formulario */}
            <div class="grow w-full flex items-center justify-center p-6 h-auto">

                {/* INICIAR SESION */}
                <Show when={isLogin()}>
                    <div class="w-full max-w-4xl rounded-4xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
                        {/* placeholder */}
                        <div class="relative rounded-tl-[40px] rounded-bl-[40px] hidden md:block bg-gradient-to-br from-lucy-secondary to-lucy-primary"></div>
                        <form onSubmit={handleLogin} class="flex flex-col justify-center p-8 w-full gap-8">
                            <h2 class="text-3xl font-fira font-bold text-lucy-light">Iniciar Sesion</h2>
                            <input
                                type="email" placeholder="Email" required
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setEmail(e.currentTarget.value)}
                            />
                            <div class="relative w-full flex items-center gap-8">
                                <input
                                    type={isShowPassword() ? 'text' : 'password'} placeholder="Contraseña" required minLength={6} maxLength={20}
                                    class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                    onInput={(e) => setPassword(e.currentTarget.value)}
                                />                                
                                <LucyIconButtonNoA ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" class="px-8 rounded-full flex items-center gap-2 hover:bg-lucy-light transition-all shadow-md active:scale-95 cursor-pointer" type="button" ButtonIconSide="right" ButtonIcon={isShowPassword() ? <Eye/> : <EyeClosed/>} onClick={() => {setShowPassword(!isShowPassword())}}/>
                            </div>
                            <div class="flex justify-center md:justify-end">
                                <LucyButtonNoA ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" ButtonText="Acceder" class="px-12 rounded-full flex items-center gap-2 hover:bg-lucy-light transition-all shadow-md active:scale-95 cursor-pointer md:w-fit" type="submit" ButtonIconSide="right" ButtonIcon={<ChevronRight size={35}/>} />
                            </div>
                        </form>
                    </div>
                </Show>

                {/* CREA UNA CUENTA */}
                <Show when={!isLogin()}>
                    <div class="w-full max-w-4xl rounded-4xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
                        {/* placeholder */}
                        <div class="relative rounded-tl-[40px] rounded-bl-[40px] hidden md:block bg-gradient-to-br from-lucy-primary to-lucy-secondary"></div>
                        <form onSubmit={handleRegister} class="flex flex-col justify-center p-8 w-full gap-8">
                            <h2 class="text-3xl font-fira font-bold text-lucy-light">Crear cuenta</h2>
                            <input 
                                type="text" placeholder="Nombre" required value={name()}
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setName(e.currentTarget.value)}/>
                            <input 
                                type="text" placeholder="Apellidos" required value={lastName()} 
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setLastName(e.currentTarget.value)}/>
                            <input
                                type="email" placeholder="Email" required
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setEmail(e.currentTarget.value)}
                            />
                            <div class="relative w-full flex items-center gap-8">
                                <input
                                    type={isShowPassword() ? 'text' : 'password'} placeholder="Contraseña" required minLength={6} maxLength={20}
                                    class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                    onInput={(e) => setPassword(e.currentTarget.value)}
                                />                                
                                <LucyIconButtonNoA ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" class="px-8 rounded-full flex items-center gap-2 hover:bg-lucy-light transition-all shadow-md active:scale-95 cursor-pointer" type="button" ButtonIconSide="right" ButtonIcon={isShowPassword() ? <Eye/> : <EyeClosed/>} onClick={() => {setShowPassword(!isShowPassword())}}/>
                            </div>
                            <div class="flex gap-3 w-fit">
                                <div class="text-lucy-dark bg-lucy-light px-8 rounded-full flex items-center justify-between text-base font-medium gap-4 w-it">
                                    <span>+1</span><span class="flex gap-2 justify-end w-fit">US<ChevronDown size={25}/></span>
                                </div>
                                <input type="tel" placeholder="Teléfono" required value={phone()} class="col-span-2 text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 form-input rounded-full outline-none border-none text-base font-medium w-full" onInput={(e) => setPhone(e.currentTarget.value)}/>
                            </div>
                            <div class="flex justify-center md:justify-end">
                                <LucyButtonNoA ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" ButtonText="Crear" class="px-12 rounded-full flex items-center gap-2 hover:bg-lucy-light transition-all shadow-md active:scale-95 cursor-pointer md:w-fit" type="submit" ButtonIconSide="right" ButtonIcon={<ChevronRight size={35}/>} />
                            </div>
                        </form>
                    </div>
                </Show>

            </div>

            {/* Barra inferior cambio */}
            <div class="w-full text-center pb-8 h-16 shrink-0">
                <p class="text-lucy-light/40 text-lg">
                    <Show when={isLogin()} fallback={<>¿Ya tienes cuenta? <button type="button" onClick={() => setIsLogin(true)} class="text-lucy-secondary font-semibold hover:underline cursor-pointer bg-transparent border-none p-0">Iniciar sesión</button></>}>
                        ¿No tienes cuenta? <button type="button" onClick={() => setIsLogin(false)} class="text-lucy-secondary font-semibold hover:underline cursor-pointer bg-transparent border-none p-0">Crear cuenta</button>
                    </Show>
                </p>
            </div>
        </div>
    );
}