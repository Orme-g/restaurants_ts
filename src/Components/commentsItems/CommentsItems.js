
import { useState } from 'react';

import { IconButton, Badge } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import './commentsItems.sass'


const CommentsItem = () => {

    const [like, setLike] = useState(2)
    const [dislike, setDislike] = useState(2)


    function handleLike() {
        setLike(like => like +1)
    }

    function handleDislike() {
            setDislike(dislike => dislike +1)
    }

    return (
        <>
        <div className="comment-card__container">
            <div className="comment-card__avatar">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
            </div>
            <div className="comment-card__content">
                <div className="comment-card__header">
                    <div className="comment-card__name">Владислав</div>
                    <div className="comment-card__user-status">Новичок</div>
                </div>
                <div className="comment-card__text">
                    <p>
                        Хорошая статья, спасибо, попробую
                    </p>
                </div>
                <div className="comment-card__footer">
                    <div className="comment-card__like">
                        <IconButton onClick={() => handleLike()}>
                            <Badge badgeContent={like} color='success'>
                                <ThumbUpIcon/>
                            </Badge>
                        </IconButton>  
                    </div>
                    <div className="comment-card__dislike">
                        <IconButton onClick={() => handleDislike()}>
                            <Badge badgeContent={-dislike} color='error'>
                                <ThumbDownIcon/>
                            </Badge>
                        </IconButton> 
                    </div>
                    <div className="comment-card__date">24.04.2023</div>
                </div>
            </div>
        </div>
        </>
    )
}


export default CommentsItem