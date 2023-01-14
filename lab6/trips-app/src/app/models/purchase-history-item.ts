export interface PurchaseHistoryItem {
    country: string,
    name: string,
    quantity: number,
    price: number,
    totalPlaces: number,
    startDate: string,
    endDate: string,
    purchaseDate: string,
    status?: string,
    userUID: string,
    tripID: string
}