export interface IRestaurant {
    _id?: string;
    name: string;
    short_description: string;
    description: string;
    images: string[];
    cousine: string[];
    rating: number;
    adress: string;
    bill: number;
    phone: string;
    createdAt: Date;
    title_image: string;
    city: string;
    subway: string[];
}

export interface IAddRestaurant {
    name: string;
    short_description: string;
    description: string;
    cousine: string[];
    adress: string;
    bill: number;
    phone: string;
    city: string;
    subway: string[];
}

export type TSortRestaurants = "expensive" | "cheap" | "best";

export interface IFindRestaurantCriterias {
    subway: string;
    cousine: string[];
    sortBy: "cheaper" | "expensive";
}
