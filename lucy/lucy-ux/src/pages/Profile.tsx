// src/pages/Profile.tsx
import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { Navigation } from "../components/Navigation";
import ArrowLeft from "lucide-solid/icons/arrow-left";
import ChevronRight from "lucide-solid/icons/chevron-right";
import ChevronDown from "lucide-solid/icons/chevron-down";
import Eye from "lucide-solid/icons/eye";
import EyeClosed from "lucide-solid/icons/eye-closed";
import { LucyIconButtonNoA, LucyButton, LucyButtonNoA } from "../components/LucyButton";

type ProfileState = "menu" | "edit";

interface Cats {
    name: string;
    option: string;
    link?: string;
    onClick?: () => void;
}

export default function Profile() {
    const [viewState, setViewState] = createSignal<ProfileState>("menu");
    const [isShowPassword, setShowPassword] = createSignal(false);
    const navigate = useNavigate();

    const categorias: Cats[] = [
    {name: "Mis reservas", option: "A", link: "/reservas"},
    {name: "Editar perfil", option: "B", onClick: () => {setViewState("edit")}},
    {name: "Soporte", option: "A", link: "/soporte"},
    {name: "Cerrar sesión", option: "A", link: "/cuenta/login"},
];

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
            
                <LucyIconButtonNoA onClick={() => {if (viewState() === "edit") setViewState("menu");else navigate("/");}}
                    ButtonBackground="lucy-dark" ButtonForeground="lucy-light" ButtonSize="md" ButtonIcon={<ArrowLeft size={30}/>} class="z-60 max-w-fit" />

            {/* area de visualizacion central */}
            <div class="grow w-full flex items-center justify-start mx-auto p-8 min-h-[500px]">

                {/* Menu deAcciones */}
                <Show when={viewState() === "menu"}>
                    <div class="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-36 items-start p-16">

                {/* COLUMNA IZQUIERDA */}
                <div class="flex flex-col max-w-[85dvw]">
                    <h2 class="text-3xl font-bold text-white mb-4 tracking-wide pl-6">
                        ¡Hola!
                    </h2>

                    {categorias.map((cat) => {
                        if (cat.option === "A" && cat.link) {
                            return <LucyButton ButtonLink={cat.link} ButtonText={cat.name} ButtonBackground="lucy-dark" ButtonForeground="lucy-primary" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChevronRight height={50} width={50}/>} />
                        } else if (cat.option === "B" && cat.onClick) {
                            return <LucyButtonNoA onClick={cat.onClick} ButtonText={cat.name} ButtonBackground="lucy-dark" ButtonForeground="lucy-primary" ButtonSize="full" ButtonIconSide="right" ButtonIcon={<ChevronRight height={50} width={50}/>} />
                        } else {
                            return <></>
                        }
                    })}
                </div>
            </div>
                </Show>

                {/* EditarPerfil */}
                <Show when={viewState() === "edit"}>
                    <form onSubmit={handleUpdateProfile} class="flex flex-col justify-center items-center p-8 w-full gap-8 lg:max-w-[60dvw] mx-auto">
                            <h2 class="text-3xl font-fira font-bold text-lucy-light">Editar perfil</h2>
                            <input 
                                type="text" placeholder="Nombre" required value={name()}
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setName(e.currentTarget.value)}/>
                            <input 
                                type="text" placeholder="Apellidos" required value={lastName()} 
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setLastName(e.currentTarget.value)}/>
                            <input
                                type="email" placeholder="Email" value={email()} required
                                class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                onInput={(e) => setEmail(e.currentTarget.value)}
                            />
                            <div class="relative w-full flex items-center gap-8">
                                <input
                                    type={isShowPassword() ? 'text' : 'password'} placeholder="Contraseña" value={password()} required minLength={6} maxLength={20}
                                    class="form-input rounded-full w-full text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 outline-none border-none text-base font-medium"
                                    onInput={(e) => setPassword(e.currentTarget.value)}
                                />                                
                                <LucyIconButtonNoA ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" class="px-8 rounded-full flex items-center gap-2 hover:bg-lucy-light transition-all shadow-md active:scale-95 cursor-pointer" type="button" ButtonIconSide="right" ButtonIcon={isShowPassword() ? <Eye/> : <EyeClosed/>} onClick={() => {setShowPassword(!isShowPassword())}}/>
                            </div>
                            <div class="flex gap-3 w-full">
                                <div class="text-lucy-dark bg-lucy-light px-8 rounded-full flex items-center justify-between text-base font-medium gap-4 w-it">
                                    <span>+1</span><span class="flex gap-2 justify-end w-fit">US<ChevronDown size={25}/></span>
                                </div>
                                <input type="tel" placeholder="Teléfono" required value={phone()} class="col-span-2 text-lucy-dark bg-lucy-light placeholder-lucy-dark/40 form-input rounded-full outline-none border-none text-base font-medium w-full" onInput={(e) => setPhone(e.currentTarget.value)}/>
                            </div>
                            <div class="flex justify-center md:justify-end">
                                <LucyButtonNoA ButtonBackground="lucy-primary" ButtonForeground="lucy-dark" ButtonSize="md" ButtonText="Confirmar" class="px-12 rounded-full flex items-center gap-2 hover:bg-lucy-light transition-all shadow-md active:scale-95 cursor-pointer md:w-fit" type="submit" ButtonIconSide="right" ButtonIcon={<ChevronRight size={35}/>} />
                            </div>
                        </form>
                </Show>

            </div>

            <div class="h-16 shrink-0 w-full"></div>

        </div>
    );
}