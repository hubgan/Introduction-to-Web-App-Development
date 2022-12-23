export interface ITrip {
    id: number;
    country: string;
    name: string;
    startDate: string;
    endDate: string;
    unitPrice: number;
    availablePlaces: number;
    rating: number;
    description: string;
    imageUrl: string;
    prices?: {
        minPrice: number,
        maxPrice: number
    }
}