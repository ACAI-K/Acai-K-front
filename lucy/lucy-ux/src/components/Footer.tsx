import { A } from "@solidjs/router";
import { Logo } from "../assets/Logo";

export function Footer() {
    return (
        <footer class="bg-lucy-primary text-lucy-dark py-12 px-8 mt-auto border-t border-lucy-dark/10">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Imagotipo de Lucy */}
                <div class="flex items-center">
                    <A href="/" class="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        <Logo class="w-24 h-24" />
                        <span class="font-fira text-4xl font-bold tracking-tight text-lucy-dark mt-2">Lucy</span>
                    </A>
                </div>

                {/* Explorar */}
                <div>
                    <h4 class="font-work text-xl mb-4 font-semibold">Explorar</h4>
                    <ul class="space-y-2 font-work text-[15px]">
                        <li><A href="/explorar#locaciones" class="hover:text-white transition-colors">Locaciones</A></li>
                        <li><A href="/explorar" class="hover:text-white transition-colors">Parques autorizados</A></li>
                        <li><A href="/explorar#puntos" class="hover:text-white transition-colors">Puntos de interés</A></li>
                        <li><A href="/mapa" class="hover:text-white transition-colors">Mapa interactivo</A></li>
                        <li><A href="/mapa" class="hover:text-white transition-colors">Condiciones climáticas</A></li>
                    </ul>
                </div>

                {/* Cuenta */}
                <div>
                    <h4 class="font-work text-xl mb-4 font-semibold">Cuenta</h4>
                    <ul class="space-y-2 font-work text-[15px]">
                        <li><A href="/cuenta" class="hover:text-white transition-colors">Registro</A></li>
                        <li><A href="/cuenta" class="hover:text-white transition-colors">Inicio de sesión</A></li>
                        <li><A href="/perfil" class="hover:text-white transition-colors">Mis reservaciones</A></li>
                        <li><A href="/soporte" class="hover:text-white transition-colors">Soporte</A></li>
                    </ul>
                </div>

                {/* Hospedaje */}
                <div>
                    <h4 class="font-work text-xl mb-4 font-semibold">Hospedaje</h4>
                    <ul class="space-y-2 font-work text-[15px]">
                        <li><A href="/hospedaje" class="hover:text-white transition-colors">Busca alojamiento</A></li>
                        <li><A href="/resultados?q=Hoteles" class="hover:text-white transition-colors">Hoteles</A></li>
                        <li><A href="/resultados?q=Cabañas" class="hover:text-white transition-colors">Cabañas</A></li>
                        <li><A href="/resultados?q=Campamentos" class="hover:text-white transition-colors">Camping</A></li>
                        <li><A href="/resultados?q=Casas" class="hover:text-white transition-colors">Casas</A></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div class="mt-16 text-center font-work text-sm text-lucy-dark/80">
                <p>© Festival Internacional de las Luciérnagas.</p>
                <p>AÇAI Koders. Todos los derechos reservados</p>
            </div>
        </footer>
    );
}