
import { useSelector } from 'react-redux';

import { IconButton, Badge } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useGetCommentsQuery, useDeleteCommentMutation } from '../RTQ/apiSlice';

import Spinner from '../spinner/Spinner';

import './commentsItems.sass'
import { memo } from 'react';


const CommentsItem = memo(({topic}) => {

    // const {pageLoading, donerTopicComments} = useSelector(state => state.doners)

    // if (pageLoading === 'loading' || donerTopicComments === null) {
    //     return <Spinner/>
    // }
    const [deleteComment] = useDeleteCommentMutation()

    const onDelete = (id) => {
        deleteComment(id)
    }

    const {
        data: topicComments,   //  Даём название переменной, куда придут данные
        isFetching,     //  Второй и последующий запросы на сервер
        isLoading,      //  Первой запрос данных на сервер
        isSuccess,      //  Успешная загрузка данных
        isError       //  Объект с информацией об ошибке
    } = useGetCommentsQuery(topic)
    console.log(topicComments, isError, isFetching, isSuccess, isLoading)

    if (isLoading) {
        return <Spinner/>
    }

    // const comments = donerTopicComments.map(({name, likes, dislikes, createdAt, text, _id}) => {
        const comments = topicComments.map(({name, likes, dislikes, createdAt, text, _id}) => {
        const date = new Date(createdAt).toLocaleString('ru',{day:'numeric', month:'long', year:'numeric'})
        return (
            <div className="comment-card__container" key={_id}>
                <div className="comment-card__avatar">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
                </div>
                <div className="comment-card__content">
                    <div className="comment-card__header">
                        <div className="comment-card__name">{name}</div>
                        <div className="comment-card__user-status">Новичок</div>
                    </div>
                    <div className="comment-card__text">
                        <p>
                            {text}
                        </p>
                    </div>
                    <div className="comment-card__footer">
                        <div className="comment-card__like">
                            {/* <IconButton onClick={() => handleLike()}> */}
                            <IconButton>
                                <Badge badgeContent={likes} color='success'>
                                    <ThumbUpIcon/>
                                </Badge>
                            </IconButton>  
                        </div>
                        <div className="comment-card__dislike">
                            {/* <IconButton onClick={() => handleDislike()}> */}
                            <IconButton>
                                <Badge badgeContent={-dislikes} color='error'>
                                    <ThumbDownIcon/>
                                </Badge>
                            </IconButton> 
                            <button onClick={() => onDelete(_id)}>Delete</button>
                        </div>
                        <div className="comment-card__date">{date}</div>
                    </div>
                </div>
            </div>
        )
    })



    return (
        <>
            {comments}
        </>
    )
})


export default CommentsItem