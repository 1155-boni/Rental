export interface Rental {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    available: boolean;
}

export interface User {
    id: number;
    username: string;
    email: string;
    rentals: Rental[];
}

export interface RentalResponse {
    rentals: Rental[];
    total: number;
}