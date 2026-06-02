import type { TypeOtro } from "../data/types";
import CardPDI from "./CardPDI";

export default function CardPark(props: {otro: TypeOtro}) {
        return ( 
        <CardPDI pdi={props.otro} href={`/reservas/${props.otro.id}}`} buttonText="Ver en mapa" >
            {""}
        </CardPDI> 
    );
}