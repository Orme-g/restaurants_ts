import { useState } from "react"

import { useSelector } from "react-redux"

import { TextField, Button, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import { usePostCommentMutation } from "../../../services/apiSlice"

import "./commentForm.sass"

const CommentForm = ({ replyData, topicId, setReplyData }) => {
    const [commentText, setCommentText] = useState("")
    // const [reply, setReplyData] = useState({})
    const [valid, setValid] = useState(false)
    const { username } = useSelector((state) => state.interactive.userData)
    const [postComment] = usePostCommentMutation()
    // useEffect(() => {
    //     setReplyData(replyData)
    // }, [replyData])

    console.log(replyData)

    function handleSubmit() {
        // const reply = replyData ? replyData : null
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
            if (replyData) {
                newComment = { ...newComment, reply: replyData }
            }
            // console.log(newComment)
            postComment(newComment).unwrap()
            setCommentText("")
            setReplyData(null)
        }
    }
    const replyBlock = (
        <div className="comments__reply">
            Ответ на:
            <div className="comments__reply_name">{replyData?.name}</div>
            <div className="comments__reply_text">{replyData?.text}</div>
            <IconButton className="comments__reply_cancel" onClick={() => setReplyData(null)}>
                <CloseIcon />
            </IconButton>
        </div>
    )

    return (
        <form className="comments__add-form">
            {replyData ? replyBlock : null}
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
