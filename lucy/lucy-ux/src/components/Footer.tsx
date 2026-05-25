// src/components/Footer.tsx
import { A } from "@solidjs/router";
import { Logo } from "../assets/Logo";

export function Footer() {
    return (
        <footer class="bg-lucy-primary text-lucy-dark py-12 px-8 mt-auto border-t border-lucy-dark/10">
            <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Columna 1: Imagotipo Real de Lucy */}
                <div class="flex items-center">
                    <A href="/" class="flex items-center gap-2 hover:opacity-90 transition-opacity">
                        {/* Cargamos tu SVG con un tamaño proporcional para el footer */}
                        <Logo class="w-24 h-24" />
                        <span class="font-fira text-4xl font-bold tracking-tight text-lucy-dark mt-2">Lucy</span>
                    </A>
                </div>

                {/* Columna 2: Explorar */}
                <div>
                    <h4 class="font-work text-xl mb-4 font-semibold">Explorar</h4>
                    <ul class="space-y-2 font-work text-[15px]">
                        <li><A href="#" class="hover:text-white transition-colors">Parques autorizados</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Puntos de interés</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Mapa interactivo</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Mapa sin conexión</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Condiciones climáticas</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Nivel de concurrencia</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Precio de acceso</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Galería de fotos</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Horarios de espectáculos</A></li>
                    </ul>
                </div>

                {/* Columna 3: Cuenta */}
                <div>
                    <h4 class="font-work text-xl mb-4 font-semibold">Cuenta</h4>
                    <ul class="space-y-2 font-work text-[15px]">
                        <li><A href="#" class="hover:text-white transition-colors">Registro</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Inicio de sesión</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Perfil de usuario</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Datos de usuario</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Cierre de sesión</A></li>
                    </ul>
                </div>

                {/* Columna 4: Hospedaje */}
                <div>
                    <h4 class="font-work text-xl mb-4 font-semibold">Hospedaje</h4>
                    <ul class="space-y-2 font-work text-[15px]">
                        <li><A href="#" class="hover:text-white transition-colors">Parques autorizados</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Alojamiento</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Hoteles</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Cabañas</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Camping</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Selección de fechas</A></li>
                        <li><A href="#" class="hover:text-white transition-colors">Mis reservaciones</A></li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div class="mt-16 text-center font-work text-sm text-lucy-dark/80">
                <p>© Festival Internacional de las luciérnagas.</p>
                <p>AÇAI Koders. Todos los derechos reservados</p>
            </div>
        </footer>
    );
}