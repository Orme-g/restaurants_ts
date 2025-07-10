export interface IRegisterData {
    username: string;
    name: string;
    surname: string;
    birthday: null | Date;
    email: string;
    password: string;
    // password1: string;
    // password2: string;
}

export interface IBlogData {
    blogerName: string;
    blogPosts: string[];
    blogPostsCount: number;
    blogerRating: number;
    aboutMe: string;
    blogAvatar: string;
    blogCity: string;
}

export interface IUserData {
    avatar: string;
    comments: number;
    email: string;
    name: string;
    registeredAt: Date;
    reviews: number;
    role: string[];
    token: string;
    username: string;
    _id: string;
    birthday: Date;
    reviewedRestaurants: string[];
    favouriteRestaurants: string[][];
    ratedComments: string[];
    rating: number;
    bloger: boolean;
    blogData?: IBlogData;
    ratedBlogPosts: string[];
}
