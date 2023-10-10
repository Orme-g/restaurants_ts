
import { useSelector } from 'react-redux'

import { Rating } from '@mui/material'
import Spinner from '../spinner/Spinner'

import './feedbackItem.sass'



const FeedbackItem = () => {

    console.log('Feedback render')

    const {restaurantReviews} = useSelector(state => state.restaurants)

    if (restaurantReviews === null) {
        return <Spinner/>
    }

    const feedbackList = restaurantReviews.map(({name, avatar, like, dislike, rating, _id}) => {
        return (
            <div className='feedback-card__container' key={_id}>
            <div className="feedback-card__header">
                <div className="feedback-card__header_avatar">
                    <img src={avatar} alt={name} />
                </div>
                <div className="feedback-card__header_user">
                    <div className="feedback-card__header_username">{name}</div>
                    <div className="feedback-card__header_userstatus">Новичок</div>
                </div>
                <div className="feedback-card__header_rating">
                    <Rating name="rating" value={rating} precision={0.5} readOnly /> 
                </div>
            </div>
            <div className="feedback-card__body">
                <div className='feedback-card__body_title'>Понравилось:</div>
                <div className='feedback-card__body_content'>{like}</div>
                <div className='feedback-card__body_title'>Не понравилось:</div>
                <div className='feedback-card__body_content'>{dislike}</div>
                <div className='feedback-card__body_title'>Оценка:</div>
                <div className='feedback-card__body_content'>{rating}</div>
            </div>
        </div>
        )
    })

    return (
        <>
            {feedbackList}
        </>
    )
}

export default FeedbackItem