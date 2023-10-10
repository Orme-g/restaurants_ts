
import { useState } from 'react'
import { TextField, Button } from '@mui/material'

import CommentsItems from '../commentsItems/CommentsItems'

import './commentsBlock.sass'


const CommentsBlock = () => {

    const [commentText, setCommentText] = useState('')
    const [error, setError] = useState(false)

    function handleSubmit() {
        if (commentText.length < 10) {
            setError(true)
        } else {
            setError(false)
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
                    error={error}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    helperText={error?'Минимум 10 символов':''}
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
                <CommentsItems/>

            </div>
        </section>
        </>
    )
}


export default CommentsBlock