import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";

// Vistas
const Home = lazy(() => import("./pages/Home"));
const ParkDetail = lazy(() => import("./pages/ParkDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));

// Componente Layout Global
const MainLayout = (props: { children?: any }) => {
    return (
        <div class="min-h-screen flex flex-col w-full bg-lucy-dark">
            <Navigation />
            {/* Contenido (Las páginas) */}
            <div class="grow mt-12">
                {props.children}
            </div>

            {/* Footer Fijo al final */}
            <Footer />
        </div>
    );
};

function App() {
    const Account = lazy(() => import("./pages/Account"));
    return (
        <Router root={MainLayout}>
            <Route path="/" component={Home} />
            <Route path="/park/:id" component={ParkDetail} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/search" component={lazy(() => import("./pages/SearchResults"))} />
            <Route path="/mapa" component={lazy(() => import("./pages/Map"))} />
            <Route path="/cuenta" component={(props) => <Account {...props} loginOrRegister="login"/>} />
            <Route path="/cuenta/login" component={(props) => <Account {...props} loginOrRegister="login"/>} />
            <Route path="/cuenta/register" component={(props) => <Account {...props} loginOrRegister="register"/>} />
            <Route path="/resultados" component={lazy(() => import("./pages/SearchResults"))} />
            <Route path="/perfil" component={lazy(() => import("./pages/Profile"))} />
            <Route path="/hospedaje" component={lazy(() => import("./pages/Hospedaje"))} />
            <Route path="/explorar" component={lazy(() => import("./pages/Explorar"))} />
            <Route path="/reservas"  component={lazy(() => import("./pages/LDDs"))} />
            <Route path="/reservas/:idLDD/:idHab" component={lazy(() => import("./pages/Recibo"))} />
            <Route path="/reservas/:idLDD"  component={lazy(() => import("./pages/Habitaciones"))} />
            <Route path="/mis-reservas" component={lazy(() => import("./pages/MisReservas"))} />
            <Route path="/pago" component={lazy(() => import("./pages/Pago"))} />
            <Route path="/confirmacion" component={lazy(() => import("./pages/Confirmacion"))} />
            <Route path="/admin-ldd/habitaciones" component={lazy(() => import("./pages/AdminLDDHabitaciones"))} />
            <Route path="/admin-ldd/crear-habitacion" component={lazy(() => import("./pages/CrearHabitacion"))} />
            <Route path="/admin-ldd/editar-ldd" component={lazy(() => import("./pages/EditarLDD"))} />
            {/* <Route path="/admin-ldd/editar-habitacion" component={lazy(() => import("./pages/EditarHabitacion"))} /> */}
            <Route path="/admin-ldd" component={lazy(() => import("./pages/MenuAdminLDD"))} />
            <Route path="/admin/registro-ldd" component={lazy(() => import("./pages/RegistroLDD"))} />
            <Route path="/admin/ticket/:id" component={lazy(() => import("./pages/Ticket"))} />
            <Route path="/admin/tickets" component={lazy(() => import("./pages/Tickets"))} />
            <Route path="/admin" component={lazy(() => import("./pages/MenuAdmin"))} />

        </Router>
    );
}

export default App;