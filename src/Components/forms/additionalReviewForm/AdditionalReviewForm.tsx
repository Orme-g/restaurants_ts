import React, { useState } from "react";

import { Stack, TextField, Button, Rating } from "@mui/material";
import { useForm } from "react-hook-form";

import { addAdditionalReview, fetchRestaurantReviews } from "../../../reducers/restaurants";
import { useAppDispatch } from "../../../types/store";
import { callSnackbar } from "../../../reducers/interactive";
import "./additionalReviewForm.sass";

interface IAdditionalReviewProps {
    reviewId: string;
    restId: string;
    displayStatus: boolean;
    toggleDisplayStatus: () => void;
}

const AdditionalReviewForm: React.FC<IAdditionalReviewProps> = ({
    reviewId,
    restId,
    displayStatus,
    toggleDisplayStatus,
}) => {
    const [rating, setRating] = useState<number>(1);
    const dispatch = useAppDispatch();
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
    const onSubmit = (data: { like: string; dislike: string }, event: any) => {
        event.preventDefault();
        const { like, dislike } = data;
        const additionalReview = {
            reviewId,
            like,
            dislike,
            rating,
            restId,
        };
        dispatch(addAdditionalReview(JSON.stringify(additionalReview)))
            .then(({ payload }) => {
                dispatch(callSnackbar({ text: payload.message, type: "success" }));
                dispatch(fetchRestaurantReviews(restId));
                reset({ like: "", dislike: "" });
            })
            .catch((error) => console.log(error));
    };
    const currentFormStatus = displayStatus ? "show-with-animation" : "hide-with-animation";

    return (
        <form
            className={`additional-review-form ${currentFormStatus}`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={3} className="additional-review-form__content">
                <div>Дополните ваш отзыв:</div>
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
                        precision={0.5}
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue as number);
                        }}
                    />
                    <Button style={{ marginLeft: "auto" }} type="submit">
                        Отправить
                    </Button>
                    <Button onClick={toggleDisplayStatus}>Отмена</Button>
                </Stack>
            </Stack>
        </form>
    );
};
export default AdditionalReviewForm;
