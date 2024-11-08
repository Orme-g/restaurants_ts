export interface IBlogPost {
    _id: string;
    userId: string;
    createdAt: Date;
    themes: string[];
    likes: number;
    title_image: string;
    short_description: string;
    description: string;
}
