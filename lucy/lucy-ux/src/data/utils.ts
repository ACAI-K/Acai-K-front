import { MOCK_PARKS } from './mockData';

export const getParkById = (id: string) => {
    return MOCK_PARKS.find(park => park.id === id);
};