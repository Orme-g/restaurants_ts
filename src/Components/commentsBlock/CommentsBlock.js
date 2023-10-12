
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

import { usePostCommentMutation } from '../../services/apiSlice'

import CommentsItems from '../commentsItems/CommentsItems'

import './commentsBlock.sass'



const CommentsBlock = ({currentTopicId}) => {

    const [commentText, setCommentText] = useState('')
    const [valid, setValid] = useState(false)

    const [
        post
    ] = usePostCommentMutation()    

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
            post(newComment).unwrap() // unwrap вызывается чтобы сущности {isLoading, isFetching} отрабатывали верно
            setCommentText('')

        }
    } 

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
            <CommentsItems topicId={currentTopicId}/>
            </div>
        </section>
        </>
    )
}


export default CommentsBlock