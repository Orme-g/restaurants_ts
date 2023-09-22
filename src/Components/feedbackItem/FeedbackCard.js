
import { Rating } from '@mui/material'

import './feedbackCard.sass'


const FeedbackItem = () => {


    return (

        <div className='feedback-card__container'>
            <div className="feedback-card__header">
                <div className="feedback-card__header_avatar">
                    <img src="https://i.pinimg.com/originals/b4/72/a1/b472a1234f0fad2a6bd45750c14e7bec.jpg" alt="user" />
                </div>
                <div className="feedback-card__header_user">
                    <div className="feedback-card__header_username">Элеонора</div>
                    <div className="feedback-card__header_userstatus">Новичок</div>
                </div>
                <div className="feedback-card__header_rating">
                    <Rating name="rating" value={3.5} precision={0.5} readOnly /> 
                </div>
            </div>
            <div className="feedback-card__body">
                <div className='feedback-card__body_title'>Понравилось:</div>
                <div className='feedback-card__body_content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae natus distinctio nam ab eaque libero delectus pariatur, ex placeat consequuntur nihil quia ipsam mollitia ipsa ullam? Blanditiis, dignissimos labore, velit dolores consequuntur id quaerat non adipisci vero doloribus a numquam deleniti optio sunt sit minus nisi minima alias quisquam asperiores.</div>
                <div className='feedback-card__body_title'>Не понравилось:</div>
                <div className='feedback-card__body_content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ut dolorum doloremque reprehenderit nihil pariatur cumque, iusto incidunt sit amet quos quisquam maxime voluptate laboriosam. Quis dolor ipsum magnam temporibus?50</div>
                <div className='feedback-card__body_title'>Оценка:</div>
                <div className='feedback-card__body_content'>3.5</div>
            </div>
        </div>
    )
}

export default FeedbackItem