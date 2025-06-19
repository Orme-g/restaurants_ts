export interface IRestaurant {
    _id?: string;
    name: string;
    short_description: string;
    description: string;
    images: string[];
    cousine: string[];
    rating: number[];
    // rating: { marks: number; overallRating: number };
    adress: string;
    bill: number;
    phone: string;
    createdAt: Date;
    title_image: string;
    city: string;
    coordinates: string;
    subway: string[];
    events: string[];
    averageRating: number;
}

export interface IAddRestaurant {
    name: string;
    short_description: string;
    description: string;
    cousine: string[];
    adress: string;
    bill: number | null;
    phone: string;
    city: string;
    coordinates: string;
    subway: string[];
}

export type TSortRestaurants = "expensive" | "cheap" | "best";

export interface IFindRestaurantCriterias {
    subway: string;
    cousine: string[];
    sortBy: "cheaper" | "expensive";
}
