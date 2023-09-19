
import Grid from '@mui/material/Unstable_Grid2'
import { Rating, Avatar } from '@mui/material'

import './feedbackItem.sass'


const FeedbackItem = () => {


    return (
        <div className='feedback-item__container'>
            <div className="feedback-item__header">
                <Grid container alignContent='center' spacing={3}>
                <Grid xs={2}>
                    <Avatar className='feedback-item__image' sx={{height: '60px', width: '60px'}} src="https://i.pinimg.com/originals/b4/72/a1/b472a1234f0fad2a6bd45750c14e7bec.jpg"/>
                </Grid>
                    
                <Grid  alignSelf='center' xs={4}>
                   <div className="feedback-item__username"> Элеонора </div>
                </Grid>
                <Grid xs={6} alignSelf='center'>
                    <Rating className='feedback-item__rating' name="rating" value={3.5} precision={0.5} readOnly /> 
                </Grid>
                </Grid>
            </div>
            <div className='feedback-item__content'>
                <div className='feedback-item__like'>Что понравилось: 
                <p className='light-text'>
                Посетили ваш ресторан 15 августа. Сразу предложили столик на террасе с очень хорошим видом. Мы побоялись, что позже будет прохладно, так как собирался дождь. Милая девушка отвела нас на удачное место внутри с прекрасным видом. Другая девушка, которая нас обслуживала, поставила цветы в воду, и когда я отошла, поинтересовалась у моих сыновей причиной торжества. У меня был День рождения. Про скидку 20% мы были в курсе, но меня ещё угостили очень вкусным пирожным и принесли фейерверк. Было очень приятно. Ведь наше настроение создают приятные моменты. Спасибо большое за внимание! Желаю процветания вашему ресторану и всей сети Ginza Project.
                </p>
                </div>
                <div className='feedback-item__dislike'>Недостатки: 
                <p className='light-text'>
                Спустя 2 недели после торжества хочется поделиться отзывом о данном заведении. Начну с самого начала. Домик на веранде мы забронировали за месяц до торжества, сразу оплатили депозит, и девушке, на том конце провода сами рассказали о поводе (хотя в моменте клиентоориентированности не плохо было бы ей самой поинтересоваться поводом) но да ладно. Попросила ее украсить стол, как на фото в соцсетях, где они себя позиционируют как top
                </p>
                </div>
                <div className='feedback-item__number'>Оценка: (3.5)</div>
            </div>

        </div>
    )
}

export default FeedbackItem