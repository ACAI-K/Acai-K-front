import { createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import ChevronDown from "lucide-solid/icons/chevron-down";
import Eye from "lucide-solid/icons/eye";
import EyeClosed from "lucide-solid/icons/eye-closed";
import { LucyIconButton, LucyIconButtonNoA, LucyButtonNoA } from "../components/LucyButton";

export default function CreateAcc() {
        const navigate = useNavigate();
    
        const [isShowPassword, setShowPassword] = createSignal(false);
        const [email, setEmail] = createSignal("");
        const [password, setPassword] = createSignal("");
        const [name, setName] = createSignal("Alejandro");
        const [lastName, setLastName] = createSignal("Jacome Delgado");
        const [phone, setPhone] = createSignal("605 243 1230");
    return (
        <div class="bg-lucy-dark text-lucy-light flex flex-col justify-between font-work h-fit w-fit overflow-hidden mx-auto">
            <form onSubmit={() => {}} class="flex flex-col justify-center p-8 w-full gap-8">
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
            </form>
        </div>
    );
}