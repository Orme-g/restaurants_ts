
import { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useSelector } from 'react-redux'

import { usePostCommentMutation } from '../../services/apiSlice'
import useLocalStorage from '../../hooks/useLocalStorage'

import CommentsItems from '../commentsItems/CommentsItems'

import './commentsBlock.sass'



const CommentsBlock = ({currentTopicId}) => {

    const [commentText, setCommentText] = useState('')
    const [valid, setValid] = useState(false)
    const {getUserData} = useLocalStorage()
    const [
        post
    ] = usePostCommentMutation() 
    let username = null
    // eslint-disable-next-line 
    const passAuth = useSelector(state => state.interactive.passAuth)

    if (getUserData()) {
        username = getUserData().username
    }
    console.log('render')

    

    function handleSubmit() {
        if (commentText.length < 10) {
            setValid(true)
        } else {
            setValid(false)
            let newComment = {
                        name: username,
                        topic: currentTopicId,
                        likes: 0,
                        dislikes: 0,
                        text: commentText
                    }
            post(newComment).unwrap()
            setCommentText('')

        }
    } 

    const unAuth = <div className='comments__unauth'>Войдите или зарегистрируйтесь, чтобы оставлять комментарии.</div>
    const isAuth = <form className='comments__add-form'>
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

    return (
        <>
        <section className="comments__container">
            <div className="comments__add">
                <div className='comments__add-title'>Оставить комментарий: </div>
                {username? isAuth : unAuth}
            
            </div>
            <div className="comments__title">Комментарии:</div>
            <div className="comments__list">
            <CommentsItems topicId={currentTopicId}/>
            </div>
        </section>
        </>
    )
}


export default CommentsBlock