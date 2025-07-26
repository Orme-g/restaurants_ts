import React, { useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../../types/store";
import { callSnackbar } from "../../reducers/interactive";
import {
    useGetCommentsQuery,
    useEvaluateCommentMutation,
    useDeleteCommentMutation,
} from "../../services/commentsApi";
import { useGetRatedCommentsListQuery } from "../../services/userApi";
import CommentForm from "../forms/commentForm/CommentForm";
import CommentsItem from "../commentsItem/CommentsItem";
import type { IReplyData, TCommentReplyFunction } from "../../types/commentsTypes";
import Spinner from "../svg/Spinner";

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
    const userData = useAppSelector((state) => state.interactive.userData);
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const isAdmin = !!userData?.role.includes("admin");
    const [deleteComment] = useDeleteCommentMutation();
    const [evaluateComment] = useEvaluateCommentMutation();
    const { data: ratedComments } = useGetRatedCommentsListQuery(undefined, { skip: !isAuth });
    const { data: topicComments, isLoading } = useGetCommentsQuery(currentTopicId);
    const unAuth = (
        <div className="comments__unauth">
            Войдите или зарегистрируйтесь, чтобы оставлять комментарии.
        </div>
    );
    const noComments = <div className="no-comments">Комментариев пока нет. Отсавьте первый!</div>;
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
    const onDelete = (id: string, reason: string) => {
        deleteComment({ id, reason })
            .unwrap()
            .then(({ message }) => dispatch(callSnackbar({ text: message, type: "success" })))
            .catch(({ data }) => dispatch(callSnackbar({ text: data, type: "error" })));
    };
    function handleEvaluateComment(id: string, type: "like" | "dislike") {
        if (isAuth) {
            let body = { id, type };
            evaluateComment(body).then(() => {});
        } else {
            dispatch(
                callSnackbar({
                    text: "Войдите или зарегистрируйтесь чтобы поставить реакцию",
                    type: "info",
                })
            );
        }
    }
    if (isLoading || !topicComments) {
        return <Spinner />;
    }
    const displayComments = topicComments.map((commentData) => {
        const { _id } = commentData;
        return (
            <CommentsItem
                commentData={commentData}
                onDelete={onDelete}
                handleEvaluateComment={handleEvaluateComment}
                ratedComments={ratedComments}
                commentReply={commentReply}
                key={_id}
                isAdmin={isAdmin}
            />
        );
    });
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
                    {topicComments && topicComments.length > 0 ? displayComments : noComments}
                </div>
            </section>
        </>
    );
};

export default CommentsBlock;
