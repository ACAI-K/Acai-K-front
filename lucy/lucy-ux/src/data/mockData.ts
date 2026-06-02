// src/data/mockData.ts
// src/data/mockData.ts
import type {Locat, Amenidad, PDI, TypeParque, TypeDormitorio, TypeOtro } from './types';
import Wifi from 'lucide-solid/icons/wifi';
import CircleParking from 'lucide-solid/icons/circle-parking';
import Dumbbell from 'lucide-solid/icons/dumbbell';
import Coffee from 'lucide-solid/icons/coffee';
import Accessibility from 'lucide-solid/icons/accessibility';
import WashingMachine from 'lucide-solid/icons/washing-machine';
import Baby from 'lucide-solid/icons/baby';
import WavesHorizontal from 'lucide-solid/icons/waves-horizontal';
import UtensilsCrossed from 'lucide-solid/icons/utensils-crossed';
import PawPrint from 'lucide-solid/icons/paw-print';
import Flower2 from 'lucide-solid/icons/flower-2';
import Fan from 'lucide-solid/icons/fan';

// Arreglo mucho más limpio usando los componentes de Lucide directamente
export const AMENIDADES_DISPONIBLES: Amenidad[] = [
    { id: "wifi", nombre: "WiFi", icono: Wifi},
    { id: "estacionamiento", nombre: "Estacionamiento", icono: CircleParking},
    { id: "gym", nombre: "GYM", icono: Dumbbell},
    { id: "desayuno", nombre: "Desayuno Incluido", icono: Coffee},
    { id: "accesibilidad", nombre: "Accesibilidad", icono: Accessibility},
    { id: "lavanderia", nombre: "Servicio de Lavandería", icono: WashingMachine},
    { id: "guarderia", nombre: "Guardería", icono: Baby},
    { id: "alberca", nombre: "Alberca", icono: WavesHorizontal},
    { id: "restaurante", nombre: "Restaurante", icono: UtensilsCrossed},
    { id: "petfriendly", nombre: "Pet-friendly", icono: PawPrint},
    { id: "spa", nombre: "SPA", icono: Flower2},
    { id: "aire", nombre: "Aire Acondicionado", icono: Fan},
];

export const CATEGORIAS_DISPONIBLES = ["Parques", "Hoteles", "Cabañas", "Campamentos", "Hospitales", "Policía", "Gasolinería"];

export function typeOfPDI(PDI : PDI) {
    if ("precio_noche" in PDI) {
        return 0 // Es un TypeDormitorio
    } else if ("precio_por_dia" in PDI) {
        return 1; // Es un TypeParque
    } else {
        return 2; // Es un TypeOtro
    }
}

export const MOCK_LOCATIONS: Locat[] = [
    {
    id: 'loc-ame',
    name: 'Amecameca',
    edo: 'Estado de México',
    map_data: {
        coordinates: { lat: 19.128072, lng: -98.774712 },
        viewport: { height: 0.05, weight: 0.05 }
    },
    puntos_interes: [
        {
            id: 'ame-p-1',
            name: 'Hacienda Panoaya (Parque)',
            images: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v'],
            coordinates: { lat: 19.128072, lng: -98.774712 },
            link_google_maps: 'https://maps.app.goo.gl/haafpUrX5LXfNnwS7',
            // @ts-ignore
            location: "Amecamenca, Estado de México",
            description: "La Hacienda Panoaya es un parque temático y cultural ubicado en Amecameca, Estado de México. Este lugar ofrece a los visitantes una experiencia única al combinar la belleza natural con la historia y la cultura mexicana. Con amplias áreas verdes, jardines bien cuidados y una arquitectura colonial impresionante, la Hacienda Panoaya es ideal para paseos familiares, picnics y eventos especiales. Además, cuenta con actividades recreativas, talleres culturales y espacios para eventos, convirtiéndola en un destino popular para quienes buscan disfrutar de la naturaleza y la cultura en un solo lugar.",
            capacidad_actual: 0,
            categoria: "Parque Ecológico",
            precio_por_dia: 250,
            features: [AMENIDADES_DISPONIBLES.find(a => a.id === "estacionamiento")!, AMENIDADES_DISPONIBLES.find(a => a.id === "restaurante")!,],
            reviews: 4
        },
        {
            id: 'ame-h-1',
            name: 'Hospital General Amecameca',
            images: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v'],
            coordinates: { lat: 19.12853187919965, lng: -98.76652797193354 },
            link_google_maps: 'https://maps.app.goo.gl/xTt7ASFqCniS757o7',
            // @ts-ignore
            location: "Amecamenca, Estado de México",
            description: "El Hospital General Amecameca es una institución de salud ubicada en Amecameca, Estado de México. Este hospital ofrece una amplia gama de servicios médicos, incluyendo atención de urgencias, consultas externas, hospitalización y especialidades médicas. Con un equipo de profesionales altamente capacitados y tecnología moderna, el Hospital General Amecameca se dedica a brindar atención de calidad a la comunidad local y a los visitantes que puedan necesitar servicios médicos durante su estancia en la región.",
            categoria: "Hospital",
            reviews: 4
        },
        {
            id: 'ame-d-1',
            name: 'Hotel Boutique Hacienda Panoaya',
            images: [],
            coordinates: { lat: 19.12731383110683, lng: -98.78015368305705 },
            link_google_maps: 'https://maps.app.goo.gl/3yB1AavyP9qez6536',
            // @ts-ignore
            location: "Amecamenca, Estado de México",
            description: "El Hotel Boutique Hacienda Panoaya es un encantador alojamiento ubicado dentro de la Hacienda Panoaya en Amecameca, Estado de México. Este hotel boutique ofrece a los huéspedes una experiencia única al combinar la elegancia de una hacienda colonial con las comodidades modernas. Con habitaciones decoradas con estilo, jardines exuberantes y vistas impresionantes del paisaje circundante, el Hotel Boutique Hacienda Panoaya es el lugar perfecto para aquellos que buscan una escapada romántica o una estancia tranquila en un entorno natural y culturalmente rico.",
            categoria: "Hotel",
            precio_noche: 799.99,
            features: [AMENIDADES_DISPONIBLES.find(a => a.id === "alberca")!, AMENIDADES_DISPONIBLES.find(a => a.id === "restaurante")!],
            reviews: 4,
            habitaciones: [
                {
                    id: 'ame-d-1-h-1',
                    nombre: "Habitación Deluxe",
                    descripcion: "Habitación espaciosa con cama king size, vista al jardín y baño privado.",
                    camasIndividuales: 0,
                    camasDobles: 0,
                    camasQueenSize: 0,
                    camasKingSize: 1,
                    precioNoche: 1999.99,
                    maxOcupantes: 2,
                    disponibles: 3,
                    imagenes: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v']
                },
                {
                    id: 'ame-d-1-h-2',
                    nombre: "Habitación Estándar",
                    descripcion: "Habitación acogedora con cama matrimonial y baño compartido.",
                    camasIndividuales: 0,
                    camasDobles: 1,
                    camasQueenSize: 0,
                    camasKingSize: 0,
                    precioNoche: 799.99,
                    maxOcupantes: 2,
                    disponibles: 5,
                    imagenes: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v']
                }
            ]
        }
    ]
},
{
    id: 'loc-tla',
    name: 'Tlalmanalco',
    edo: 'Estado de México',
    map_data: {
        coordinates: { lat: 19.210570875758137, lng: -98.77495814129117 },
        viewport: { height: 0.05, weight: 0.05 }
    },
    puntos_interes: [
        {
            id: 'tla-p-1',
            name: 'Bosque Esmeralda (Parque)',
            images: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v', 'https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v'],
            coordinates: { lat: 19.210570875758137, lng: -98.77495814129117 },
            link_google_maps: 'https://maps.app.goo.gl/3qZVfb9npovwCoRq5',
            // @ts-ignore
            location: "Tlalmanalco, Estado de México",
            description: "El Bosque Esmeralda es un parque ecológico ubicado en Tlalmanalco, Estado de México. Con una extensión de 50 hectáreas, este parque ofrece a los visitantes la oportunidad de conectarse con la naturaleza a través de sus senderos arbolados, áreas de picnic y zonas de observación de flora y fauna local. Es un lugar ideal para caminatas, paseos en bicicleta y actividades al aire libre, brindando un escape tranquilo del bullicio urbano.",
            capacidad_actual: 1,
            categoria: "Parque Ecológico",
            precio_por_dia: 100,
            features: [AMENIDADES_DISPONIBLES.find(a => a.id === "estacionamiento")!, AMENIDADES_DISPONIBLES.find(a => a.id === "alberca")!],
            reviews: 4
        },
        {
            id: 'tla-h-1',
            name: 'Centro de Salud Tlalmanalco',
            images: [],
            coordinates: { lat: 19.206599315896586, lng: -98.76907873921712 },
            link_google_maps: 'https://maps.app.goo.gl/y14y8MsgB9WgUq4H8',
            // @ts-ignore
            location: "Tlalmanalco, Estado de México",
            description: "El Centro de Salud Tlalmanalco es una institución médica ubicada en Tlalmanalco, Estado de México. Este centro de salud ofrece servicios médicos básicos, atención primaria y programas de prevención para la comunidad local. Con un equipo de profesionales dedicados a la salud pública, el Centro de Salud Tlalmanalco se esfuerza por mejorar el bienestar de los residentes y visitantes que puedan necesitar atención médica durante su estancia en la región.",
            categoria: "Hospital",
            reviews: 4
        },
        {
            id: 'tla-d-1',
            name: 'Rancho La Mesa (Hospedaje)',
            images: [],
            coordinates: { lat: 19.19575351471647, lng: -98.76997301116631 },
            link_google_maps: 'https://maps.app.goo.gl/zdmMTB2mG8N15SgE6',
            // @ts-ignore
            location: "Tlalmanalco, Estado de México",
            description: "El Rancho La Mesa es un encantador hospedaje ubicado en Tlalmanalco, Estado de México. Este rancho ofrece a los huéspedes una experiencia auténtica al combinar la belleza natural del campo con la comodidad de un alojamiento rústico. Con habitaciones acogedoras, áreas verdes para relajarse y actividades al aire libre como paseos a caballo y senderismo, el Rancho La Mesa es el lugar perfecto para aquellos que buscan una escapada tranquila en un entorno natural y pintoresco.",
            categoria: "Cabañas",
            precio_noche: 1199.99,
            features: [AMENIDADES_DISPONIBLES.find(a => a.id === "estacionamiento")!, AMENIDADES_DISPONIBLES.find(a => a.id === "petfriendly")!, AMENIDADES_DISPONIBLES.find(a => a.id === "aire")!, AMENIDADES_DISPONIBLES.find(a => a.id === "wifi")!],
            reviews: 4,
            habitaciones: [
                {
                    id: 'tla-d-1-h-1',
                    nombre: "Cabaña",
                    descripcion: "Cabaña acogedora con cama matrimonial, baño privado y vista al campo.",
                    camasIndividuales: 0,
                    camasDobles: 1,
                    camasQueenSize: 0,
                    camasKingSize: 0,
                    precioNoche: 1199.99,
                    maxOcupantes: 2,
                    disponibles: 3,
                    imagenes: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v']
                }
            ]
        }
    ]
},
{
    id: 'loc-tex',
    name: 'Texcoco',
    edo: 'Estado de México',
    map_data: {
        coordinates: { lat: 19.519052478932238, lng: -98.87484181747607 },
        viewport: { height: 0.05, weight: 0.05 }
    },
    puntos_interes: [
        {
            id: 'tex-p-1',
            name: 'Parque Molino de Flores',
            images: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v', 'https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v', 'https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v'],
            coordinates: { lat: 19.519052478932238, lng: -98.87484181747607 },
            link_google_maps: 'https://maps.app.goo.gl/kWTWgtoQdzTq8XTG8',
            // @ts-ignore
            location: "Texcoco, Estado de México",
            description: "El Parque Molino de Flores es un parque ecológico y recreativo ubicado en Texcoco, Estado de México. Este parque ofrece a los visitantes una experiencia única al combinar la belleza natural con la historia y la cultura mexicana. Con amplias áreas verdes, jardines bien cuidados y una arquitectura colonial impresionante, el Parque Molino de Flores es ideal para paseos familiares, picnics y eventos especiales. Además, cuenta con actividades recreativas, talleres culturales y espacios para eventos, convirtiéndolo en un destino popular para quienes buscan disfrutar de la naturaleza y la cultura en un solo lugar.",
            capacidad_actual: 2,
            categoria: "Parque Ecológico",
            precio_por_dia: 50,
            features: [AMENIDADES_DISPONIBLES.find(a => a.id === "estacionamiento")!, AMENIDADES_DISPONIBLES.find(a => a.id === "accesibilidad")!],
            reviews: 4
        },
        {
            id: 'tex-h-1',
            name: 'Hospital General de Texcoco',
            images: [],
            coordinates: { lat: 19.516481756227368, lng: -98.87928817511866 },
            link_google_maps: 'https://maps.app.goo.gl/wii7wjsvyB3xEzpZA',
            // @ts-ignore
            location: "Texcoco, Estado de México",
            description: "El Hospital General de Texcoco es una institución médica ubicada en Texcoco, Estado de México. Este hospital ofrece servicios médicos básicos, atención primaria y programas de prevención para la comunidad local. Con un equipo de profesionales dedicados a la salud pública, el Hospital General de Texcoco se esfuerza por mejorar el bienestar de los residentes y visitantes que puedan necesitar atención médica durante su estancia en la región.",
            categoria: "Hospital",
            reviews: 4
        },
        {
            id: 'tex-d-1',
            name: 'Hotel La Mansión (Hospedaje)',
            images: [],
            coordinates: { lat: 19.514057949056074, lng: -98.88009956137442 },
            link_google_maps: 'https://maps.app.goo.gl/T42zd1gRkbTg8KmGA',
            // @ts-ignore
            location: "Texcoco, Estado de México",
            description: "El Hotel La Mansión es un encantador alojamiento ubicado en Texcoco, Estado de México. Este hotel ofrece a los huéspedes una experiencia única al combinar la elegancia de una mansión colonial con las comodidades modernas. Con habitaciones decoradas con estilo, jardines exuberantes y vistas impresionantes del paisaje circundante, el Hotel La Mansión es el lugar perfecto para aquellos que buscan una escapada romántica o una estancia tranquila en un entorno natural y culturalmente rico.",
            categoria: "Hotel",
            precio_noche: 1899.99,
            features: [AMENIDADES_DISPONIBLES.find(a => a.id === "wifi")!, AMENIDADES_DISPONIBLES.find(a => a.id === "desayuno")!, AMENIDADES_DISPONIBLES.find(a => a.id === "accesibilidad")!, AMENIDADES_DISPONIBLES.find(a => a.id === "alberca")!, AMENIDADES_DISPONIBLES.find(a => a.id === "restaurante")!, AMENIDADES_DISPONIBLES.find(a => a.id === "gym")!, AMENIDADES_DISPONIBLES.find(a => a.id === "aire")!],
            reviews: 4,
            habitaciones: [
                {
                    id: 'tex-d-1-h-1',
                    nombre: "Suite Del Patrón",
                    descripcion: "Habitación lujosa con cama king size, sala de estar, cocineta y todas las comodidades para una estancia inolvidable.",
                    camasIndividuales: 0,
                    camasDobles: 0,
                    camasQueenSize: 0,
                    camasKingSize: 1,
                    precioNoche: 2599.99,
                    maxOcupantes: 2,
                    disponibles: 3,
                    imagenes: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v']
                },
                {
                    id: 'tex-d-1-h-2',
                    nombre: "Suite Estándar",
                    descripcion: "Habitación confortable para dos personas, con salida a la alberca y baño privado.",
                    camasIndividuales: 0,
                    camasDobles: 1,
                    camasQueenSize: 0,
                    camasKingSize: 0,
                    precioNoche: 1899.99,
                    maxOcupantes: 2,
                    disponibles: 3,
                    imagenes: ['https://lh5.googleusercontent.com/p/AF1QipNqY-D_L4x_zJ0-O6o8_mZ_X_v-m_X_v-m_X_v']
                }
            ]
        }
    ]
}
];

export const MOCK_AVAILABILITY = {
    '1': ['2026-06-01', '2026-06-02', '2026-06-05'],
    '2': ['2026-06-10', '2026-06-11'],
    '3': ['2026-06-01', '2026-06-08', '2026-06-15']
};