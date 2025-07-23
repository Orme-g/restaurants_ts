import React from "react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../types/store";
import { callSnackbar } from "../../reducers/interactive";

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
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const unAuth = (
        <div className="comments__unauth">
            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
        </div>
    );
    const scrollCommentFormIntoView = () => {
        const form = document.querySelector(".comments__add-form") as HTMLFormElement;
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const commentReply: TCommentReplyFunction = ({ name, text, commentId }) => {
        if (!isAuth) {
            dispatch(
                callSnackbar({ text: "Войдите или зарегистрируйтесь чтобы ответить", type: "info" })
            );
            return;
        }
        setReplyData({ name, text, commentId });
        scrollCommentFormIntoView();
    };
    return (
        <>
            <section className="comments__container">
                <div className="comments__add">
                    <div className="comments__add-title">Оставить комментарий: </div>
                    {isAuth ? (
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
