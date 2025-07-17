export interface IRegisterData {
    username: string;
    name: string;
    surname: string;
    birthday: null | string;
    email: string;
    password: string;
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

export interface IUserStoreData {
    name: string;
    username: string;
    role: string[];
    _id: string;
}

export interface IUserPublicData {
    name: string;
    username: string;
    avatar: string;
    comments: number;
    reviews: number;
}
