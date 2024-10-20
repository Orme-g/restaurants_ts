export interface IReview {
    _id: string;
    // name: string;
    // avatar: string;
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
