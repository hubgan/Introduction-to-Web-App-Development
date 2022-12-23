import { ITrip } from "./ITrip";

export class Trip implements ITrip {
    id!: number;
    country!: string;
    name!: string;
    startDate!: string;
    endDate!: string;
    unitPrice!: number;
    availablePlaces!: number;
    rating!: number;
    description!: string;
    imageUrl!: string;
    prices?: {
        minPrice: number,
        maxPrice: number
    }
}
