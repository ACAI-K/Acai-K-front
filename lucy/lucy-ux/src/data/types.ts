//@deprecated
export interface Park {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    pricePerDay: number;
    features: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface TypeDormitorio extends PDI {
    categoria: "Hotel" | "Cabañas" | "Campamento" | "Habitaciones";
    precio_noche: number;
    features: string[];
}

export interface TypeParque extends PDI {
    categoria: "Parque Ecológico" | "Reserva Natural";
    precio_por_dia: number;
    features: string[];
}

export interface TypeOtro extends PDI {
    categoria: "Policía" | "Hospital" | "Gasolinería";
    
}

export interface PDI {
    id: string;
    name: string;
    
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    link_google_maps: string;
    telefono?: string;
    website?: string;
}

export interface Locat {
    id: string;
    name: string;
    edo: string;

    map_data: {
        coordinates: {
            lat: number;
            lng: number;
        };
        viewport: {
            height: number;
            weight: number;
        }
    }
    puntos_interes: PDI[];

}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface AvailabilitySlot {
    date: string;
    isAvailable: boolean;
}

export interface Reservation {
    id: string;
    parkId: string;
    userName: string;
    userEmail: string;
    checkIn: string;    // ISO Date
    checkOut: string;   // ISO Date
    totalPrice: number;
    status: ReservationStatus;
}


/**
 * Este tipo sirve para el "carrito" o estado actual
 * de la sesión mientras el usuario navega.
 */
export interface BookingContext {
    park: Park | null;
    dates: {
        start: string | null;
        end: string | null;
    };
    guests: number;
}