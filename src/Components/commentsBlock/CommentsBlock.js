import { useState } from "react"
import { useSelector } from "react-redux"

import CommentsItems from "../commentsItems/CommentsItems"
import CommentForm from "../forms/commentForm/CommentForm"

import "./commentsBlock.sass"

const CommentsBlock = ({ currentTopicId }) => {
    const [replyData, setReplyData] = useState(null)
    const checkAuth = useSelector((state) => state.interactive.passAuth)
    const unAuth = (
        <div className="comments__unauth">
            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
        </div>
    )
    const commentReply = (name, text) => {
        setReplyData({ name, text })
    }
    return (
        <>
            <section className="comments__container">
                <div className="comments__add">
                    <div className="comments__add-title">Оставить комментарий: </div>
                    {checkAuth ? (
                        <CommentForm
                            replyData={replyData}
                            topicId={currentTopicId}
                            setReplyData={setReplyData}
                        />
                    ) : (
                        unAuth
                    )}
                </div>
                <div className="comments__title">Комментарии:</div>
                <div className="comments__list">
                    <CommentsItems commentReply={commentReply} topicId={currentTopicId} />
                </div>
            </section>
        </>
    )
}

export default CommentsBlock
