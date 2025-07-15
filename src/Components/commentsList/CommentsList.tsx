import React, { useState } from "react";
import { memo } from "react";
import {
    useGetCommentsQuery,
    useEvaluateCommentMutation,
    useDeleteCommentMutation,
} from "../../services/commentsApi";
// import { updateUserData, callSnackbar } from "../../reducers/interactive";
import { callSnackbar } from "../../reducers/interactive";
import { useAppSelector, useAppDispatch } from "../../types/store";
import CommentsItem from "../commentsItem/CommentsItem";
// import useLocalStorage from "../../hooks/useLocalStorage";

import type { TCommentReplyFunction } from "../../types/commentsTypes";

import Spinner from "../svg/Spinner";

interface ICommentItemProps {
    topicId: string;
    commentReply: TCommentReplyFunction;
}

const CommentsList: React.FC<ICommentItemProps> = memo(({ topicId, commentReply }) => {
    const [deleteComment] = useDeleteCommentMutation();
    const [evaluateComment] = useEvaluateCommentMutation();
    const userData = useAppSelector((state) => state.interactive.userData);
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const ratedComments = userData?.ratedComments;
    const userId = userData?._id;
    const isAdmin = !!userData?.role.includes("admin");
    const { data: topicComments, isLoading } = useGetCommentsQuery(topicId);
    const onDelete = (id: string, reason: string) => {
        deleteComment({ id, reason })
            .unwrap()
            .then(({ message }) => dispatch(callSnackbar({ text: message, type: "success" })))
            .catch(({ data }) => dispatch(callSnackbar({ text: data, type: "error" })));
    };
    // const { getUserData } = useLocalStorage();
    // const isAdmin = getUserData()?.role.includes("admin");
    const dispatch = useAppDispatch();
    const noComments = <div className="no-comments">Комментариев пока нет. Отсавьте первый!</div>;
    function handleEvaluateComment(id: string, type: "like" | "dislike") {
        if (isAuth && userId) {
            let body = { userId, id, type };
            evaluateComment(body).then(() => {
                dispatch(updateUserData());
            });
        } else {
            dispatch(
                callSnackbar({
                    text: "Войдите или зарегистрируйтесь чтобы поставить реакцию",
                    type: "info",
                })
            );
        }
    }
    if (isLoading) {
        return <Spinner />;
    }
    let comments;
    if (topicComments) {
        comments = topicComments.map((data) => {
            const { _id } = data;
            return (
                <CommentsItem
                    commentData={data}
                    onDelete={onDelete}
                    handleEvaluateComment={handleEvaluateComment}
                    ratedComments={ratedComments}
                    commentReply={commentReply}
                    key={_id}
                    isAdmin={isAdmin}
                />
            );
        });
    }

    return <>{topicComments && topicComments?.length > 0 ? comments : noComments}</>;
});

export default CommentsList;
