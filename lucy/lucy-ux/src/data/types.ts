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

export type Amenidad = {
    id: string;
    nombre: string;
    icono: (props: any) => any;
};

export interface TypeDormitorio extends PDI {
    categoria: "Hotel" | "Cabañas" | "Campamento" | "Habitaciones";
    precio_noche: number;
}

export interface TypeParque extends PDI {
    categoria: "Parque Ecológico" | "Reserva Natural";
    precio_por_dia: number;
    capacidad_actual: 0 | 1 | 2; // 0 = Vacío o casi vacío, 1 = Capacidad media, 2 = Lleno o casi lleno
}

export interface TypeOtro extends PDI {
    categoria: "Policía" | "Hospital" | "Gasolinería";
}

export interface PDI {
    id: string;
    name: string;
    categoria: string;
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    location: string;
    description: string;
    link_google_maps: string;
    features?: Amenidad[];
    telefono?: string;
    website?: string;
    reviews?: number;
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
    puntos_interes: (TypeDormitorio | TypeParque | TypeOtro)[];

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