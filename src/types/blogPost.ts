export interface IBlogPost {
    _id: string;
    title: string;
    subtitle: string;
    title_image: string;
    short_description: string;
    content?: { [key: string]: string }[];
    createdAt: Date;
    userId: string;
    themes: string[];
    likes: number;
}
