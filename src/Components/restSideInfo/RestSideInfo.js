
import { Rating } from '@mui/material'

import './restSideInfo.sass'

const RestSideInfo = () => {


// Верстку переписать через гриды
    return (
        <div className='rest-side-info__container'>
            <div className="rest-side-info__rating">
                {/* Рейтинг: <span className='rating'> 7.6</span> */}
            Рейтинг: <br/>  <Rating name="read-only" value={3.7} precision={0.1} readOnly />
            </div>
            <div className='rest-side-info__item'>
                Кухня: <span>Европейская, азиатская, бургеры</span>
            </div>
            <div className='rest-side-info__item'>
                Время работы: <br/> 
                <span>ПН-ЧТ: 10:00 - 22:00</span><br/>
                <span>ПТ-ВС: 10:00 - 00:00</span>
            </div>
            <div className='rest-side-info__item'>
                Адрес: <span>ул. Маяковского 11, вход со двора</span>
            </div>
            <div className='rest-side-info__item'>
                Средний чек: <span>550 &#8381;</span>  
            </div>
            <div className='rest-side-info__item'>
                Телефон: <span>8-(800)-555-35-35</span>
            </div>
        </div>
    )
}

export default RestSideInfo