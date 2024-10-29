import React from "react";
import { memo } from "react";
import { IconButton, Badge, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";
import {
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useEvaluateCommentMutation,
} from "../../services/commentsApi";
import { updateUserData, callSnackbar } from "../../reducers/interactive";
import { useAppSelector, useAppDispatch } from "../../types/store";

import transformDate from "../../utils/transformDate";

import type { TCommentReplyFunction, IComment } from "../../types/commentsTypes";

import Spinner from "../svg/Spinner";

import "./commentsList.sass";

interface ICommentItemProps {
    topicId: string;
    commentReply: TCommentReplyFunction;
}

const CommentsList: React.FC<ICommentItemProps> = memo(({ topicId, commentReply }) => {
    const [deleteComment] = useDeleteCommentMutation();
    const [evaluateComment] = useEvaluateCommentMutation();
    const actualUserData = useAppSelector((state) => state.interactive.userData);
    const isAuth = useAppSelector((state) => state.interactive.passAuth);
    const ratedComments = actualUserData?.ratedComments;
    const userId = actualUserData?._id;
    const { data: topicComments, isLoading } = useGetCommentsQuery(topicId);
    const onDelete = (id: string) => {
        deleteComment(id).unwrap();
    };
    const dispatch = useAppDispatch();
    const noComments = <div className="no-comments">Комментариев пока нет. Отсавьте первый!</div>;
    function handleLike(id: string) {
        if (isAuth && userId) {
            let body = { userId, id, type: "like" };
            evaluateComment(body).then(() => {
                dispatch(updateUserData(userId));
            });
        } else {
            dispatch(
                callSnackbar({
                    text: "Войдите или зарегистрируйтесь чтобы поставить реакцию",
                    type: "info",
                })
            );
        }
    }
    function handleDislike(id: string) {
        if (isAuth && userId) {
            let body = { userId, id, type: "dislike" };
            evaluateComment(body).then(() => {
                dispatch(updateUserData(userId));
            });
        } else {
            dispatch(
                callSnackbar({
                    text: "Войдите или зарегистрируйтесь чтобы поставить реакцию",
                    type: "info",
                })
            );
        }
    }

    if (isLoading) {
        return <Spinner />;
    }
    let comments;
    if (topicComments) {
        comments = topicComments.map(
            ({ name, likes, dislikes, createdAt, text, _id, reply }: IComment) => {
                const date = transformDate(createdAt);
                let beingRated = false;
                if (ratedComments) {
                    beingRated = ratedComments.includes(_id);
                }
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
                            <div className="comment-card__footer">
                                <div className="comment-card__like">
                                    <IconButton
                                        disabled={beingRated}
                                        onClick={() => handleLike(_id)}
                                    >
                                        <Badge badgeContent={likes} color="success">
                                            <ThumbUpIcon />
                                        </Badge>
                                    </IconButton>
                                </div>
                                <div className="comment-card__dislike">
                                    <IconButton
                                        disabled={beingRated}
                                        onClick={() => handleDislike(_id)}
                                    >
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

    return <>{topicComments && topicComments?.length > 0 ? comments : noComments}</>;
});

export default CommentsList;
