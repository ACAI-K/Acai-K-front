import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";
import { Footer } from "./components/Footer";

// Vistas
const Home = lazy(() => import("./pages/Home"));
const ParkDetail = lazy(() => import("./pages/ParkDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));

// Componente Layout Global
const MainLayout = (props: { children?: any }) => {
    return (
        <div class="min-h-screen flex flex-col bg-lucy-dark">
            {/* Contenido dinámico (Las páginas) */}
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
        </Router>
    );
}

export default App;