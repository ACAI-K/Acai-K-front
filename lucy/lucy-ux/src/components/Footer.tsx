import { A } from "@solidjs/router";
import { Logo } from "../assets/Logo";

export function Footer() {
    return (
        <footer class="bg-lucy-disabled text-lucy-primary py-12 px-8 mt-auto border-t border-lucy-dark/10">
            <div class="max-w-6xl mx-auto flex flex-col md:flex-row sm:justify-between md:justify-around text-center text-2xl md:text-base md:text-left gap-12 md:gap-8">

                {/* Imagotipo de Lucy */}
                <A href="/" class="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Logo class="w-full" />
                </A>

                {/* Explorar */}
                <div>
                    <A href="/explorar">
                        <h4 class="font-work text-3xl md:text-xl mb-4 font-semibold hover:text-lucy-light transition-colors">Explorar</h4>
                    </A>
                    <ul class="space-y-2 font-work">
                        <li><A href="/explorar#locaciones" class="hover:text-lucy-light transition-colors">Locaciones</A></li>
                        <li><A href="/explorar" class="hover:text-lucy-light transition-colors">Parques autorizados</A></li>
                        <li><A href="/explorar#puntos" class="hover:text-lucy-light transition-colors">Puntos de interés</A></li>
                        <li><A href="/mapa" class="hover:text-lucy-light transition-colors">Mapa interactivo</A></li>
                        <li><A href="/mapa" class="hover:text-lucy-light transition-colors">Condiciones climáticas</A></li>
                    </ul>
                </div>

                {/* Cuenta */}
                <div>
                    <A href="/cuenta?login">
                        <h4 class="font-work text-3xl md:text-xl mb-4 font-semibold hover:text-lucy-light transition-colors">Cuenta</h4>
                    </A>
                    <ul class="space-y-2 font-work">
                        <li><A href="/cuenta/register" class="hover:text-lucy-light transition-colors">Registro</A></li>
                        <li><A href="/cuenta/login" class="hover:text-lucy-light transition-colors">Inicio de sesión</A></li>
                        <li><A href="/perfil" class="hover:text-lucy-light transition-colors">Mis reservaciones</A></li>
                        <li><A href="/soporte" class="hover:text-lucy-light transition-colors">Soporte</A></li>
                    </ul>
                </div>

                {/* Hospedaje */}
                <div>
                    <A href="/hospedaje">
                        <h4 class="font-work text-3xl md:text-xl mb-4 font-semibold hover:text-lucy-light transition-colors">Hospedaje</h4>
                    </A>
                    <ul class="space-y-2 font-work">
                        <li><A href="/hospedaje" class="hover:text-lucy-light transition-colors">Busca alojamiento</A></li>
                        <li><A href="/resultados?q=Hoteles" class="hover:text-lucy-light transition-colors">Hoteles</A></li>
                        <li><A href="/resultados?q=Cabañas" class="hover:text-lucy-light transition-colors">Cabañas</A></li>
                        <li><A href="/resultados?q=Campamentos" class="hover:text-lucy-light transition-colors">Camping</A></li>
                        <li><A href="/resultados?q=Casas" class="hover:text-lucy-light transition-colors">Casas</A></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div class="mt-16 text-center font-work text-sm text-lucy-support">
                <p>© Festival Internacional de las Luciérnagas.</p>
                <p>AÇAI Koders. Todos los derechos reservados</p>
            </div>
        </footer>
    );
}