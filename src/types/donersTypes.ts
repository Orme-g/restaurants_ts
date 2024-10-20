export interface IDonerRestaurant {
    _id: string;
    name: string;
    short_description: string;
    rating: number;
    title_image: string;
    createdAt: Date;
    description: string;
    bloquote: string;
    author: string;
    images: string[];
    subtitle: string;
}
export type INewDonerArticle = Omit<
    IDonerRestaurant,
    "_id" | "images" | "title_image" | "createdAt"
>;
