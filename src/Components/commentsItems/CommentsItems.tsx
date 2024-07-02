import React from "react";
import { memo } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";
import {
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    useDislikeCommentMutation,
} from "../../services/commentsApi";

import type { TCommentReplyFunction, IComment } from "../../types/commentsTypes";

import Spinner from "../svg/Spinner";

import "./commentsItems.sass";

interface ICommentItemProps {
    topicId: string;
    commentReply: TCommentReplyFunction;
}

const CommentsItem: React.FC<ICommentItemProps> = memo(({ topicId, commentReply }) => {
    const [deleteComment] = useDeleteCommentMutation();
    const [likeComment] = useLikeCommentMutation();
    const [dislikeComment] = useDislikeCommentMutation();

    const onDelete = (id: string) => {
        deleteComment(id).unwrap();
    };

    const { data: topicComments, isLoading } = useGetCommentsQuery(topicId);

    if (isLoading) {
        return <Spinner />;
    }
    let comments;
    if (topicComments) {
        comments = topicComments.map(
            ({ name, likes, dislikes, createdAt, text, _id, reply }: IComment) => {
                const date = new Date(createdAt).toLocaleString("ru", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
                const replyBlock = (
                    <div className="comment-card__reply">
                        <div className="comment-card__reply_name">{reply?.name}</div>
                        <div className="comment-card__reply_text">{reply?.text}</div>
                    </div>
                );
                return (
                    <div className="comment-card__container" key={_id}>
                        <div className="comment-card__avatar">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="user"
                            />
                        </div>
                        <div className="comment-card__content">
                            <div className="comment-card__header">
                                <div className="comment-card__name">{name}</div>
                                <div className="comment-card__user-status">Новичок</div>
                                <div className="comment-card__delete">
                                    <IconButton onClick={() => onDelete(_id)}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div className="comment-card__content">
                                {reply?.text ? replyBlock : null}
                                <div className="comment-card__text">{text}</div>
                            </div>
                            {/* <p>{text}</p> */}
                            <div className="comment-card__footer">
                                <div className="comment-card__like">
                                    <IconButton onClick={() => likeComment(_id)}>
                                        <Badge badgeContent={likes} color="success">
                                            <ThumbUpIcon />
                                        </Badge>
                                    </IconButton>
                                </div>
                                <div className="comment-card__dislike">
                                    <IconButton onClick={() => dislikeComment(_id)}>
                                        <Badge badgeContent={-dislikes} color="error">
                                            <ThumbDownIcon />
                                        </Badge>
                                    </IconButton>
                                </div>
                                <Button
                                    className="comment-card__btn-reply"
                                    onClick={() => commentReply({ name, text })}
                                >
                                    Ответить
                                </Button>
                                <div className="comment-card__date">{date}</div>
                            </div>
                        </div>
                    </div>
                );
            }
        );
    }

    return <>{comments}</>;
});

export default CommentsItem;
