import { useState } from "react"

import { useSelector } from "react-redux"

import { TextField, Button } from "@mui/material"

import { usePostCommentMutation } from "../../../services/apiSlice"

import "./commentForm.sass"

const CommentForm = ({ topicId }) => {
    const [commentText, setCommentText] = useState("")
    const [valid, setValid] = useState(false)
    const { username } = useSelector((state) => state.interactive.userData)
    const [postComment] = usePostCommentMutation()

    function handleSubmit() {
        if (commentText.length < 10) {
            setValid(true)
        } else {
            setValid(false)
            let newComment = {
                name: username,
                topic: topicId,
                likes: 0,
                dislikes: 0,
                text: commentText,
            }
            postComment(newComment).unwrap()
            setCommentText("")
        }
    }

    return (
        <form className="comments__add-form">
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
    )
}

export default CommentForm
