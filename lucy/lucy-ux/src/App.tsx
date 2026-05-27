import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";
import { Footer } from "./components/Footer";

// Vistas
const Home = lazy(() => import("./pages/Home"));
const ParkDetail = lazy(() => import("./pages/ParkDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CrearLDD = lazy(() => import("./pages/CrearLDD"));
const MenuAdminLDD = lazy(() => import("./pages/MenuAdminLDD"));
const AdminLDDHabitaciones = lazy(() => import("./pages/AdminLDDHabitaciones"));
const CrearHabitacion = lazy(() => import("./pages/CrearHabitacion"));
const EditarLDD = lazy(() => import("./pages/EditarLDD"));
const EditarHabitacion = lazy(() => import("./pages/EditarHabitacion"));
const MenuAdmin = lazy(() => import("./pages/MenuAdmin"));
const RegistroLDD = lazy(() => import("./pages/RegistroLDD"));
const Tickets = lazy(() => import("./pages/Tickets"));
const Ticket = lazy(() => import("./pages/Ticket"));


// Componente Layout Global
const MainLayout = (props: { children?: any }) => {
    return (
        <div class="min-h-screen flex flex-col bg-lucy-dark">
            {/* Contenido (Las páginas) */}
            <div class="flex-grow">
                {props.children}
            </div>

            {/* Footer Fijo al final */}
            <Footer />
        </div>
    );
};

function App() {
    return (
        <Router root={MainLayout}>
            <Route path="/" component={Home} />
            <Route path="/park/:id" component={ParkDetail} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/mapa" component={lazy(() => import("./pages/Map"))} />
            <Route path="/cuenta" component={lazy(() => import("./pages/Account"))} />
            <Route path="/crear-ldd" component={CrearLDD} />
            <Route path="/admin-ldd" component={MenuAdminLDD} />
            <Route path="/admin-ldd/habitaciones" component={AdminLDDHabitaciones} />
            <Route path="/admin-ldd/crear-habitacion" component={CrearHabitacion} />
            <Route path="/admin-ldd/editar-habitacion" component={EditarHabitacion} />
            <Route path="/admin" component={MenuAdmin} />
            <Route path="/admin/registro-ldd" component={RegistroLDD} />
            <Route path="/admin/tickets" component={Tickets} />
            <Route path="/admin/ticket/:id" component={Ticket} />
        </Router>
    );
}

export default App;