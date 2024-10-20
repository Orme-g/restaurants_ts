import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

import pic from "../../assets/rest.jpeg";
import "./longCard.sass";

const LongCard = ({ data, link, type, date }) => {
    const { name, short_description, rating, cousine, bill } = data;
    const textField = (type) => {
        switch (type) {
            case "restaurant":
                return (
                    <>
                        {short_description}
                        <div className="wrapper">
                            <div className="label">Кухня:</div>
                            <div className="text">{cousine.join(", ")}</div>
                        </div>
                        <div className="wrapper">
                            <div className="label">Средний чек: </div>
                            <div className="text">{bill} &#8381;</div>
                        </div>
                    </>
                );
            case "doner":
                return short_description;
            default:
                return null;
        }
    };
    return (
        <Link to={link}>
            <div className="long-card__container">
                <div className="long-card__picture">
                    {/* <img src={title_image} alt="doner" /> */}
                    <img src={pic} alt="doner" />
                </div>
                <div className="long-card__info">
                    <div className="long-card__header">
                        <div className="long-card__title">{name}</div>
                        <div className="long-card__added">{date}</div>
                    </div>
                    <div className="long-card__textfield">{textField(type)}</div>
                    <div className="long-card__rating">
                        <Rating value={rating} precision={0.5} readOnly />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LongCard;
