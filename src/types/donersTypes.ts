export interface IDonerRestaurant {
    _id: string;
    title: string;
    subtitle: string;
    title_image: string;
    short_description: string;
    content: { [key: string]: string | string[] }[];
    createdAt: Date;
    author: string;
    rating: number;
}
export type INewDonerArticle = Omit<
    IDonerRestaurant,
    "_id" | "images" | "title_image" | "createdAt"
>;
