import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../types/store";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Button, Stack, TextField, Rating } from "@mui/material";
import { useGetReviewedRestaurantsListQuery } from "../../../services/userApi";
import { usePostRestaurantReviewMutation } from "../../../services/restaurantsApi";
import { callSnackbar } from "../../../reducers/interactive";
import { ShortLineSkeleton } from "../../skeletons/Skeletons";

import type { INewReview } from "../../../types/restaurantsTypes";

import "./reviewForm.scss";

interface IReviewForm {
    restId: string;
}

const ReviewForm: React.FC<IReviewForm> = ({ restId }) => {
    const [rating, setRating] = useState<number>(1);
    const [display, setDisplay] = useState(false);
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.interactive.userData);
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const name = userData?.name;
    const [postReview] = usePostRestaurantReviewMutation();
    const { data: reviewedRestaurants, isLoading } = useGetReviewedRestaurantsListQuery(undefined, {
        skip: !isAuth,
    });

    const displayForm = classNames("add-review__container", {
        show: display,
        hide: !display,
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            like: "",
            dislike: "",
        },
    });

    const onSubmit = (data: { like: string; dislike: string }) => {
        const { like, dislike } = data;
        const review: INewReview = {
            like,
            dislike,
            rating,
            restaurant: restId,
        };
        postReview(review)
            .unwrap()
            .then(({ message }) => {
                dispatch(callSnackbar({ text: message, type: "success" }));
                reset();
            })
            .catch((error) => dispatch(callSnackbar({ type: "error", text: error.message })));
    };

    const toggleDisplay = () => {
        setDisplay((display) => !display);
    };
    if (isLoading) {
        return <ShortLineSkeleton />;
    }

    return (
        <>
            {reviewedRestaurants?.includes(restId) ? (
                <div>Вы уже оставили отзыв</div>
            ) : (
                <>
                    <Button
                        sx={{
                            width: "200px",
                            color: "#494949",
                            fontSize: "1.1rem",
                        }}
                        onClick={() => toggleDisplay()}
                    >
                        Написать отзыв
                    </Button>

                    <div className={displayForm}>
                        <div className="add-review__header">
                            <div className="add-review__header_username">{name}</div>
                        </div>
                        <form className="add-review__form" onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={3} width={450} mb={2}>
                                <TextField
                                    label="Что понравилось"
                                    {...register("like", {
                                        required: "Минимум 10 символов",
                                        minLength: 10,
                                    })}
                                    error={!!errors.like}
                                    helperText={errors.like?.message}
                                    multiline
                                    minRows={3}
                                />
                                <TextField
                                    label="Что не понравилось"
                                    {...register("dislike", {
                                        required: "Минимум 10 символов",
                                        minLength: 10,
                                    })}
                                    error={!!errors.dislike}
                                    helperText={errors.dislike?.message}
                                    multiline
                                    minRows={3}
                                />
                                <Stack direction={"row"}>
                                    <Rating
                                        size="large"
                                        value={rating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setRating(newValue as number);
                                        }}
                                    />
                                    <Button type="submit" sx={{ marginLeft: "auto" }}>
                                        Отправить
                                    </Button>
                                    <Button onClick={() => toggleDisplay()}>Отмена</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default ReviewForm;
