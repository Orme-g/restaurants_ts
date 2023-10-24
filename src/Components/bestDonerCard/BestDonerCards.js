import { Link } from "react-router-dom"
import { Rating } from "@mui/material"
import { useGetDonersListQuery } from "../../services/apiSlice"
import { DonerCardsSkeleton } from "../skeletons/Skeletons"

import "./bestDonerCards.sass"

const BestDonerCards = () => {
    const { data: allDonersData, isLoading } = useGetDonersListQuery()

    if (isLoading) {
        return <DonerCardsSkeleton />
    }

    const donerCards = allDonersData.map((item) => {
        return createDonerCard(item)
    })

    function createDonerCard(card) {
        const { _id, title, rating, short_description, title_image } = card
        return (
            <Link to={`/best-doner/${_id}`} key={_id}>
                <div className="best-doner-card__container">
                    <div className="best-doner-card__picture">
                        <img src={title_image} alt="doner" />
                    </div>
                    <div className="best-doner-card__info">
                        <div className="best-doner-card__title">{title}</div>
                        <div className="best-doner-card__description">{short_description}</div>
                        <div className="best-doner-card__rating">
                            <Rating value={rating} precision={0.5} readOnly />
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return <>{donerCards}</>
}

export default BestDonerCards
