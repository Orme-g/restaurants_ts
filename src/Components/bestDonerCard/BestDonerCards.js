
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Rating } from '@mui/material'
import { fetchAllDonersData } from '../../reducers/doners'
import Spinner from '../spinner/Spinner'

import './bestDonerCards.sass'




const BestDonerCards = () => {

    const dispatch = useDispatch()
    const {allDonersData, pageLoading} = useSelector(state => state.doners)

    useEffect(() => {
        dispatch(fetchAllDonersData())
    // eslint-disable-next-line 
    }, [])

    if (pageLoading === 'loading') {
        return <Spinner/>
    }

    const donerCards = allDonersData.map(item => {
       return createDonerCard(item)
    })

  
    function createDonerCard(card) {
        const {_id, title, rating, short_description, title_image} = card
        return (
            <div className='best-doner-card__container' key={_id}>
                <div className="best-doner-card__picture">
                    <img src={title_image} alt="doner" />
                </div>
                <div className="best-doner-card__info">
                    <div className="best-doner-card__title">{title}</div>
                    <div className="best-doner-card__description">{short_description}</div>
                    <div className="best-doner-card__rating"><Rating value={rating} precision={0.5} readOnly/></div>
                </div>
            </div>
        )

    }

    return (
        <>
            {donerCards}
        </>
    )
}


export default BestDonerCards



