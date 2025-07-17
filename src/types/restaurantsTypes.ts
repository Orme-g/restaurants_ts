export interface IRestaurant {
    _id?: string;
    name: string;
    short_description: string;
    description: string;
    images: string[];
    cousine: string[];
    rating: number[];
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

export interface IAddNewRestaurant {
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
export interface IReview {
    _id: string;
    like: string;
    dislike: string;
    rating: number;
    restaurant: string;
    createdAt: Date;
    userId: string;
    additionalReview?: {
        like: string;
        dislike: string;
        rating: number;
        added: Date;
    };
}
export type INewReview = Omit<IReview, "_id" | "createdAt">;

export interface IAddidionalReview {
    reviewId: string;
    like: string;
    dislike: string;
    rating: number;
    restId: string;
}
