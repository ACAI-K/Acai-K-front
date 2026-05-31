// src/data/mockData.ts
// src/data/mockData.ts
import type {Park, Locat} from './types';

// @deprecated
export const MOCK_PARKS: Park[] = [
    {
        id: '1',
        name: 'Parque Nacional El Tepozteco',
        location: 'Morelos, MX',
        description: 'Famoso por su zona arqueológica en la cima y vistas panorámicas. Ideal para senderismo de intensidad media.',
        image: '/images/tepozteco.jpg',
        pricePerDay: 250,
        features: ['Hiking', 'Guías certificados', 'Vistas escénicas'],
        coordinates: { lat: 18.98, lng: -99.10 }
    },
    {
        id: '2',
        name: 'Reserva de la Biosfera Mariposa Monarca',
        location: 'Michoacán, MX',
        description: 'Un santuario natural impresionante. La mejor experiencia para observar la migración de la mariposa monarca.',
        image: '/images/monarca.jpg',
        pricePerDay: 400,
        features: ['Observación de fauna', 'Fotografía', 'Senderos señalizados'],
        coordinates: { lat: 19.59, lng: -100.28 }
    },
    {
        id: '3',
        name: 'Parque Ecológico Chipinque',
        location: 'Nuevo León, MX',
        description: 'Reserva protegida en la Sierra Madre Oriental. Perfecto para ciclismo de montaña y caminatas familiares.',
        image: '/images/chipinque.jpg',
        pricePerDay: 350,
        features: ['Ciclismo de montaña', 'Áreas de picnic', 'Wi-Fi en zona de visitantes'],
        coordinates: { lat: 25.59, lng: -100.37 }
    }
];

// TODO: Llenar con datos de ejemplo para las ubicaciones, siguiendo la estructura definida en el tipo Locat.
export const MOCK_LOCATIONS: Locat[] = [
    
];

export const MOCK_AVAILABILITY = {
    '1': ['2026-06-01', '2026-06-02', '2026-06-05'],
    '2': ['2026-06-10', '2026-06-11'],
    '3': ['2026-06-01', '2026-06-08', '2026-06-15']
};