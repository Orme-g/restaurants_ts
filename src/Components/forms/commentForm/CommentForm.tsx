import React from "react";
import { useState } from "react";

import { useAppSelector } from "../../../types/store";
// import { useSelector } from "react-redux";

import { TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { usePostCommentMutation } from "../../../services/apiSlice";

import type { IReplyData, TCommentReplyFunction } from "../../../types/commentsTypes";
import "./commentForm.sass";

interface ICommentProps {
    replyData: IReplyData;
    topicId: string;
    setReplyData: TCommentReplyFunction;
}

const CommentForm: React.FC<ICommentProps> = ({ replyData, topicId, setReplyData }) => {
    const [commentText, setCommentText] = useState("");
    // const [reply, setReplyData] = useState({})
    const [valid, setValid] = useState(false);
    const userData = useAppSelector((state) => state.interactive.userData);
    let nameFromUserData: string;
    if (userData) {
        const { username } = userData;
        nameFromUserData = username;
    }

    const [postComment] = usePostCommentMutation();
    // useEffect(() => {
    //     setReplyData(replyData)
    // }, [replyData])

    console.log(replyData);

    function handleSubmit() {
        // const reply = replyData ? replyData : null
        if (commentText.length < 10) {
            setValid(true);
        } else {
            setValid(false);
            let newComment = {
                name: nameFromUserData,
                topic: topicId,
                likes: 0,
                dislikes: 0,
                text: commentText,
                reply: {},
            };
            if (replyData) {
                newComment = { ...newComment, reply: replyData };
            }
            // console.log(newComment)
            postComment(newComment).unwrap();
            setCommentText("");
            setReplyData({ name: null, text: null });
        }
    }
    const replyBlock = (
        <div className="comments__reply">
            Ответ на:
            <div className="comments__reply_name">{replyData?.name}</div>
            <div className="comments__reply_text">{replyData?.text}</div>
            <IconButton
                className="comments__reply_cancel"
                onClick={() => setReplyData({ name: null, text: null })}
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
