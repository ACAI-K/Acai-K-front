
// --- Entidades Base ---

export interface Park {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;      // URL de la imagen
    pricePerDay: number;
    features: string[]; // Ej: ['Wi-Fi', 'Camping', 'Baños']
    coordinates: {      // util para el mapa interactivo que mencionaste
        lat: number;
        lng: number;
    };
}

// --- Logica de Reservaciones ---

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface AvailabilitySlot {
    date: string;       // Formato YYYY-MM-DD
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

// --- Estado del Prototipo (UX) ---

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