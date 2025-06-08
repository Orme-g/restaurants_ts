import React, { useState } from "react";

import { IconButton, Badge, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
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
    onDelete: (_id: string, reason: string) => void;
    handleEvaluateComment: (_id: string, type: "like" | "dislike") => void;
    commentReply: TCommentReplyFunction;
    isAdmin: boolean;
}

const CommentsItem: React.FC<ICommentItem> = ({
    commentData,
    onDelete,
    handleEvaluateComment,
    ratedComments,
    commentReply,
    isAdmin,
}) => {
    const [displayDeleteWindow, setDisplayDeleteWindow] = useState<boolean>(false);
    const [inputError, setInputError] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string | null>(null);
    const [deleteReason, setDeleteReason] = useState("");
    const { name, likes, dislikes, createdAt, text, _id, replyToComment, deleted } = commentData;
    const date = transformDate(createdAt);
    let beingRated = false;
    if (ratedComments) {
        beingRated = ratedComments.includes(_id);
    }
    const { data: replyCommentData } = useGetSingleCommentDataQuery(replyToComment as string, {
        skip: !!!replyToComment,
    });
    function handleDeleteComment() {
        if (deleteReason.trim().length < 10) {
            setInputError(true);
            setHelperText("Укажите причину удаления. Минимум 10 символов.");
            return;
        }
        onDelete(_id, deleteReason.trim());
        setHelperText(null);
        setInputError(false);
        setDeleteReason("");
        setDisplayDeleteWindow(false);
    }
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
    const deleteWindow = (
        <div className="delete-window">
            <div className="delete-window__title">Удаление комментария:</div>
            <div className="delete-window__text-field">
                <TextField
                    label="Причина удаления"
                    size="small"
                    fullWidth
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    helperText={helperText}
                    error={inputError}
                />
            </div>
            <div className="delete-window__buttons">
                <Button color="error" variant="contained" onClick={handleDeleteComment}>
                    Удалить
                </Button>
                <Button color="success" onClick={() => setDisplayDeleteWindow(false)}>
                    Отмена
                </Button>
            </div>
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
                            <IconButton onClick={() => setDisplayDeleteWindow(true)}>
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
                        <IconButton
                            disabled={beingRated || deleted}
                            onClick={() => handleEvaluateComment(_id, "like")}
                        >
                            <Badge badgeContent={likes} color="success">
                                <ThumbUpIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <div className="comment-card__dislike">
                        <IconButton
                            disabled={beingRated || deleted}
                            onClick={() => handleEvaluateComment(_id, "dislike")}
                        >
                            <Badge badgeContent={-dislikes} color="error">
                                <ThumbDownIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <Button
                        className="comment-card__btn-reply"
                        onClick={() => commentReply({ name, text, commentId: _id })}
                        disabled={deleted}
                    >
                        Ответить
                    </Button>
                    <div className="comment-card__date">{date}</div>
                </div>
            </div>
            {displayDeleteWindow ? deleteWindow : null}
        </div>
    );
};

export default CommentsItem;
