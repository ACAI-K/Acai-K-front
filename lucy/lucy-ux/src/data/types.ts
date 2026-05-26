
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