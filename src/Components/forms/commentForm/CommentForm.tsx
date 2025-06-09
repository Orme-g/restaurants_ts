import React from "react";
import { useState } from "react";

import { useAppDispatch } from "../../../types/store";
import { callSnackbar } from "../../../reducers/interactive";
import { TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { usePostCommentMutation } from "../../../services/commentsApi";

import type { IReplyData, TCommentReplyFunction, INewComment } from "../../../types/commentsTypes";
import "./commentForm.scss";

interface ICommentProps {
    replyData: IReplyData;
    topicId: string;
    setReplyData: TCommentReplyFunction;
}

const CommentForm: React.FC<ICommentProps> = ({ replyData, topicId, setReplyData }) => {
    const [commentText, setCommentText] = useState("");
    const [valid, setValid] = useState(false);
    const { getUserData } = useLocalStorage();
    const { username, _id } = getUserData();
    const [postComment] = usePostCommentMutation();
    const dispatch = useAppDispatch();

    function handleSubmit() {
        if (commentText.length < 10) {
            setValid(true);
        } else {
            setValid(false);
            let newComment: INewComment = {
                name: username,
                userId: _id,
                topic: topicId,
                likes: 0,
                dislikes: 0,
                text: commentText,
            };
            if (replyData?.commentId) {
                newComment = { ...newComment, replyToComment: replyData.commentId };
            }
            postComment(newComment)
                .unwrap()
                .then(({ message }) => {
                    dispatch(callSnackbar({ type: "success", text: message }));
                    setCommentText("");
                    setReplyData({ name: null, text: null, commentId: null });
                })
                .catch(({ data }) => dispatch(callSnackbar({ type: "error", text: data })));

            setReplyData({ name: null, text: null, commentId: null });
        }
    }
    const replyBlock = (
        <div className="comments__reply">
            Ответ на:
            <div className="comments__reply_name">{replyData?.name}</div>
            <div className="comments__reply_text">{replyData?.text}</div>
            <IconButton
                className="comments__reply_cancel"
                onClick={() => setReplyData({ name: null, text: null, commentId: null })}
            >
                <CloseIcon />
            </IconButton>
        </div>
    );

    return (
        <form className="comments__add-form">
            {replyData.name ? replyBlock : null}
            <TextField
                sx={{ width: "500px" }}
                label="Комментарий"
                multiline
                error={valid}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                helperText={valid ? "Минимум 10 символов" : ""}
                minRows={4}
            />
            <Button
                variant="contained"
                sx={{
                    display: "block",
                    marginTop: "20px",
                    backgroundColor: "rgb(137, 191, 82)",
                }}
                onClick={() => handleSubmit()}
            >
                Отправить
            </Button>
        </form>
    );
};

export default CommentForm;
