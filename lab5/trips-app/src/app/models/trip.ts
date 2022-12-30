export class Trip {
    id: string;
    country: string;
    name: string;
    startDate: string;
    endDate: string;
    unitPrice: number;
    availablePlaces: number;
    rating: number;
    description: string;
    prices?: {
        minPrice: number,
        maxPrice: number
    };
    images: Array<string>;
}
