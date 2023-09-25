import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { Link } from 'react-router-dom'

import './galleryItem.sass'


const GalleryItem = () => {

    const {request} = useHttp()
    const [items, setItems] = useState([])

    useEffect(() => {
        request('http://localhost:3001/restaurants')
        .then(data => setItems(data))
        // eslint-disable-next-line
    }, [])

    const makeGalleryItem = (item) => {
        const {id, name, short_description, images} = item
        return (
            <div className='restaurant-card' key={id}>
                <div className='restaurant-card__image' style={{backgroundImage: `url(${images[0]})`}}></div>
                <div className='restaurant-card__title'>{name}</div>
                <div className="restaurant-card__description">
                    {short_description}
                </div>
                {/* eslint-disable-next-line */}
                <Link to={`/restaurant/${id}`} className='restaurant-card__link'>Подробнее...</Link>
            </div>
        )
    }

    const elements = items.map(item => {
       return makeGalleryItem(item)
    })

    return (
        <>
            {elements}
        </>
    )
}



export default GalleryItem