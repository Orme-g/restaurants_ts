import React from "react";
import { useState } from "react";
import { useAppSelector } from "../../types/store";

import CommentsList from "../commentsList/CommentsList";
import CommentForm from "../forms/commentForm/CommentForm";
import type { IReplyData, TCommentReplyFunction } from "../../types/commentsTypes";

import "./commentsBlock.scss";

export interface CommentBlockProps {
    currentTopicId: string;
}

const CommentsBlock: React.FC<CommentBlockProps> = ({ currentTopicId }) => {
    const [replyData, setReplyData] = useState<IReplyData>({
        name: null,
        text: null,
        commentId: null,
    });
    const checkAuth = useAppSelector((state) => state.interactive.passAuth);
    const unAuth = (
        <div className="comments__unauth">
            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
        </div>
    );
    const commentReply: TCommentReplyFunction = ({ name, text, commentId }) => {
        setReplyData({ name, text, commentId });
    };
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
                    <CommentsList commentReply={commentReply} topicId={currentTopicId} />
                </div>
            </section>
        </>
    );
};

export default CommentsBlock;
