
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
import { fetchAllDonersData } from '../../reducers/doners'
import Spinner from '../spinner/Spinner'

import './bestDonerCards.sass'




const BestDonerCards = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllDonersData())
    // eslint-disable-next-line 
    }, [])


    const {allDonersData, pageLoading} = useSelector(state => state.doners)

    if (pageLoading === 'loading' || allDonersData === null) {
        return <Spinner/>
    }

    const donerCards = allDonersData.map(item => {
       return createDonerCard(item)
    })

  
    function createDonerCard(card) {
        const {_id, title, rating, short_description, title_image} = card
        return (
            <Link to={`/best-doner/${_id}`} key={_id}>
            <div className='best-doner-card__container'>
                <div className="best-doner-card__picture">
                    <img src={title_image} alt="doner" />
                </div>
                <div className="best-doner-card__info">
                    <div className="best-doner-card__title">{title}</div>
                    <div className="best-doner-card__description">{short_description}</div>
                    <div className="best-doner-card__rating"><Rating value={rating} precision={0.5} readOnly/></div>
                </div>
            </div>
            </Link>
        )

    }

    return (
        <>
            {donerCards}
        </>
    )
}


export default BestDonerCards



