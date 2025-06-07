export interface IReplyData {
    name: string | null;
    text: string | null;
    commentId: string | null;
}

export type TCommentReplyFunction = (arg: IReplyData) => void;

export interface IComment {
    _id: string;
    name: string;
    userId: string;
    topic: string;
    likes: number;
    dislikes: number;
    createdAt: Date;
    text: string;
    replyToComment?: string;
    deleted?: boolean;
}

export interface INewComment {
    name: string;
    userId: string;
    topic: string;
    likes: number;
    dislikes: number;
    text: string;
    replyToComment?: string;
}
