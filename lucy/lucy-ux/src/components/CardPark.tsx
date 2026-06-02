import type { TypeParque } from "../data/types";
import CardPDI from "./CardPDI";

export default function CardPark(props: {park: TypeParque}) {
        return ( 
        <CardPDI pdi={props.park} href={`/park/${props.park.id}`} buttonText="Más detalles" >
            <span class="text-xl mt-2">Desde <span class="text-2xl text-lucy-accent">${props.park.precio_por_dia}</span> p/entrada</span>
        </CardPDI> 
    );
}