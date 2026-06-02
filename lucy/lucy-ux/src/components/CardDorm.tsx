import type { TypeDormitorio } from "../data/types";
import CardPDI from "./CardPDI";

export default function CardPark(props: {dorm: TypeDormitorio}) {
        return ( 
        <CardPDI pdi={props.dorm} href={`/reservas/${props.dorm.id}`} buttonText="Reserva ya" >
            <span class="text-xl mt-2">Desde <span class="text-2xl text-lucy-accent">${props.dorm.precio_noche}</span> p/noche</span>
        </CardPDI> 
    );
}