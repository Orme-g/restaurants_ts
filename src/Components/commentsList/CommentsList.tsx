import React, { useState } from "react";
import { memo } from "react";
import {
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useEvaluateCommentMutation,
} from "../../services/commentsApi";
import { updateUserData, callSnackbar } from "../../reducers/interactive";
import { useAppSelector, useAppDispatch } from "../../types/store";
import CommentsItem from "../commentsItem/CommentsItem";
import useLocalStorage from "../../hooks/useLocalStorage";

import type { TCommentReplyFunction } from "../../types/commentsTypes";

import Spinner from "../svg/Spinner";

interface ICommentItemProps {
    topicId: string;
    commentReply: TCommentReplyFunction;
}

const CommentsList: React.FC<ICommentItemProps> = memo(({ topicId, commentReply }) => {
    const [reason, setReason] = useState<string | null>("Because it is baaad!!!");
    const [deleteComment] = useDeleteCommentMutation();
    const [evaluateComment] = useEvaluateCommentMutation();
    const actualUserData = useAppSelector((state) => state.interactive.userData);
    const isAuth = useAppSelector((state) => state.interactive.passAuth);
    const ratedComments = actualUserData?.ratedComments;
    const userId = actualUserData?._id;
    const { data: topicComments, isLoading } = useGetCommentsQuery(topicId);
    const onDelete = (id: string) => {
        deleteComment({ id, reason }).unwrap();
    };
    const { getUserData } = useLocalStorage();
    const isAdmin = getUserData()?.role.includes("admin");
    const dispatch = useAppDispatch();
    const noComments = <div className="no-comments">Комментариев пока нет. Отсавьте первый!</div>;
    function handleLike(id: string) {
        if (isAuth && userId) {
            let body = { userId, id, type: "like" };
            evaluateComment(body).then(() => {
                dispatch(updateUserData(userId));
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
    function handleDislike(id: string) {
        if (isAuth && userId) {
            let body = { userId, id, type: "dislike" };
            evaluateComment(body).then(() => {
                dispatch(updateUserData(userId));
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
                    handleDislike={handleDislike}
                    handleLike={handleLike}
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
