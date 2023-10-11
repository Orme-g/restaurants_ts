
import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useHttp } from '../../hooks/http.hook'

import { useGetCommentsQuery, usePostCommentMutation } from '../RTQ/apiSlice'

import CommentsItems from '../commentsItems/CommentsItems'

import './commentsBlock.sass'



const CommentsBlock = ({currentTopicId}) => {

    const [commentText, setCommentText] = useState('')
    const [valid, setValid] = useState(false)
    const {request} = useHttp()

    const [
        postComment,
        // {isLoading,
        // isFetching}
    ] = usePostCommentMutation()

    // const {
    //     data: comments,   //  Даём название переменной, куда придут данные
    //     isFetching,     //  Второй и последующий запросы на сервер
    //     isLoading,      //  Первой запрос данных на сервер
    //     isSuccess,      //  Успешная загрузка данных
    //     isError,        //  Ошибка
    //     error           //  Объект с информацией об ошибке
    // } = useGetCommentsQuery()
    // console.log(comments, isError, isFetching, isSuccess, isLoading)

    console.log('Render')
    

    function handleSubmit() {
        if (commentText.length < 10) {
            setValid(true)
        } else {
            setValid(false)
            let newComment = {
                        name: "Guest",
                        topic: currentTopicId,
                        likes: 0,
                        dislikes: 0,
                        text: commentText
                    }
            postComment(newComment).unwrap() // unwrap вызывается чтобы сущности {isLoading, isFetching} отрабатывали верно
            setCommentText('')

        }
    } 



    // function postComment() {
    //     let newComment = {
    //         name: "Guest",
    //         topic: currentTopicId,
    //         likes: 0,
    //         dislikes: 0,
    //         text: commentText
    //     }
    //     request('http://localhost:4000/best-doner/comments', 'POST', JSON.stringify(newComment))
    //     setCommentText('')

    // }

    return (
        <>
        <section className="comments__container">
            <div className="comments__add">
                <div className='comments__add-title'>Оставить комментарий: </div>
                <form className='comments__add-form'>
                    <TextField
                    sx={{width: '500px'}}
                    label='Комментарий'
                    multiline
                    error={valid}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    helperText={valid?'Минимум 10 символов':''}
                    minRows={4}
                    />
                    <Button
                    variant='contained' 
                    sx={{display: 'block', marginTop: '20px', backgroundColor: 'rgb(137, 191, 82)'}}
                    onClick={() => handleSubmit()}
                    >
                        Отправить
                    </Button>
                </form>
            </div>
            <div className="comments__title">Комментарии:</div>
            <div className="comments__list">
                {/* <CommentsItems donerTopicComments={comments}/> */}
            <CommentsItems topic={currentTopicId}/>
            </div>
        </section>
        </>
    )
}


export default CommentsBlock