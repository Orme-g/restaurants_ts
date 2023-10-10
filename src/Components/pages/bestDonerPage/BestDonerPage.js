
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleDonerData, fetchTopicComments } from '../../../reducers/doners'
import { useParams } from 'react-router-dom'

import CommentsBlock from '../../commentsBlock/CommentsBlock'
import { Rating } from '@mui/material'
import Slider from '../../slider/Slider'
import Spinner from '../../spinner/Spinner'


import './bestDonerPage.sass'




const BestDonerPage = () => {

    const dispatch = useDispatch()
    const {donerId} = useParams()

    useEffect(() => {
        dispatch(fetchSingleDonerData(donerId))
        dispatch(fetchTopicComments(donerId))
        // eslint-disable-next-line
    }, [])

    console.log('Page render')
    const {pageLoading, singleDonerData} = useSelector(state => state.doners)

    if (pageLoading === 'loading' || singleDonerData === null) {
        return <Spinner/>
    }

    const {title, rating, title_image, text, bloquote, author, images, subtitle, createdAt} = singleDonerData
    const date = new Date(createdAt).toLocaleString('ru',{day:'numeric', month:'long', year:'numeric'})
    return (
        <>
            <section className='doner-topic__container'>
                <div className="doner-topic__title"> {title}
                    <div className="doner-topic__subtitle"> {subtitle} </div>
                </div>
                <div className="doner-topic__image">
                    <img src={title_image} alt="doner" />
                </div>
                <div className="doner-topic__content">
                    <blockquote><p>{bloquote}</p></blockquote>
                    {text}
                </div>
                <div className="doner-topic__slider">
                    <Slider images={images}/>
                </div>
                <div className="doner-topic__rating">Наша оценка: <Rating value={rating} readOnly precision={0.1} sx={{marginLeft: '15px', transform: 'translateY(5px)'}} size='large'/></div>
                <div className="doner-topic__author">
                    Автор статьи: <span>{author}</span>
                </div>
                <div className="doner-topic__published">
                    Опубликовано: <span>{date}</span> 
                </div>
            </section>
            <CommentsBlock/>
        </>
    )
}


export default BestDonerPage