import React from "react";

import { IconButton, Badge, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";

import transformDate from "../../utils/transformDate";
import { useGetSingleCommentDataQuery } from "../../services/commentsApi";
import "./commentsItem.scss";
import { IComment, TCommentReplyFunction } from "../../types/commentsTypes";

interface ICommentItem {
    commentData: IComment;
    ratedComments: string[] | undefined;
    onDelete: (_id: string) => void;
    handleLike: (_id: string) => void;
    handleDislike: (_id: string) => void;
    commentReply: TCommentReplyFunction;
    isAdmin: boolean;
}

const CommentsItem: React.FC<ICommentItem> = ({
    commentData,
    onDelete,
    handleLike,
    handleDislike,
    ratedComments,
    commentReply,
    isAdmin,
}) => {
    const { name, likes, dislikes, createdAt, text, _id, replyToComment, deleted } = commentData;
    const date = transformDate(createdAt);
    let beingRated = false;
    if (ratedComments) {
        beingRated = ratedComments.includes(_id);
    }
    const { data: replyCommentData } = useGetSingleCommentDataQuery(replyToComment as string, {
        skip: !!!replyToComment,
    });
    const commentWithReply = (
        <>
            <div className="comment-card__reply">
                <div className="comment-card__reply_name">{replyCommentData?.name}</div>
                <div className="comment-card__reply_text">{replyCommentData?.text}</div>
            </div>
            {text}
        </>
    );
    const commentDeleted = (
        <div className="comment-card__deleted">
            <div className="comment-card__deleted_title">Комментарий удалён. Причина:</div>
            <div className="comment-card__deleted_reason">{text}</div>
        </div>
    );
    return (
        <div className="comment-card__container" key={_id}>
            <div className="comment-card__avatar">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
            </div>
            <div className="comment-card__content">
                <div className="comment-card__header">
                    <div className="comment-card__name">{name}</div>
                    {isAdmin ? (
                        <div className="comment-card__delete">
                            <IconButton onClick={() => onDelete(_id)}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    ) : null}
                </div>
                <div className="comment-card__text">
                    {deleted ? commentDeleted : replyToComment ? commentWithReply : text}
                </div>
                <div className="comment-card__footer">
                    <div className="comment-card__like">
                        <IconButton disabled={beingRated} onClick={() => handleLike(_id)}>
                            <Badge badgeContent={likes} color="success">
                                <ThumbUpIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <div className="comment-card__dislike">
                        <IconButton disabled={beingRated} onClick={() => handleDislike(_id)}>
                            <Badge badgeContent={-dislikes} color="error">
                                <ThumbDownIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <Button
                        className="comment-card__btn-reply"
                        onClick={() => commentReply({ name, text, commentId: _id })}
                    >
                        Ответить
                    </Button>
                    <div className="comment-card__date">{date}</div>
                </div>
            </div>
        </div>
    );
};

export default CommentsItem;
