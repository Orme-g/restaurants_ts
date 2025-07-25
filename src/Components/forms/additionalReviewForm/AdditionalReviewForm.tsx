import React, { useState } from "react";
import { Stack, TextField, Button, Rating } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAddAdditionalReviewMutation } from "../../../services/restaurantsApi";
import { useAppDispatch } from "../../../types/store";
import { callSnackbar } from "../../../reducers/interactive";
import "./additionalReviewForm.scss";

import type { IAddidionalReview } from "../../../types/restaurantsTypes";
interface IAdditionalReviewFormProps {
    reviewId: string;
    restId: string;
    displayStatus: boolean;
    toggleDisplayStatus: () => void;
}
interface SubmitCredentials {
    like: string;
    dislike: string;
}

const AdditionalReviewForm: React.FC<IAdditionalReviewFormProps> = ({
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
    const [sendAdditionalReview] = useAddAdditionalReviewMutation();
    const onSubmit: SubmitHandler<SubmitCredentials> = (data: {
        like: string;
        dislike: string;
    }) => {
        const { like, dislike } = data;
        const additionalReview: IAddidionalReview = {
            reviewId,
            like,
            dislike,
            rating,
            restId,
        };
        sendAdditionalReview(additionalReview)
            .unwrap()
            .then(({ message }) => {
                dispatch(callSnackbar({ text: message, type: "success" }));
                reset();
            })
            .catch((error) => dispatch(callSnackbar({ text: error.data, type: "error" })));
    };
    const currentFormStatus = displayStatus ? "show-with-animation" : "hide-with-animation";

    return (
        <form
            className={`additional-review-form ${currentFormStatus}`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack spacing={3} sx={{ margin: "20px" }}>
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
                {/* <Stack direction="row"> */}
                <div className="additional-review-form__actions">
                    <Rating
                        size="large"
                        precision={0.5}
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue as number);
                        }}
                    />
                    <div className="additional-review-form__buttons">
                        <Button type="submit">Отправить</Button>
                        <Button onClick={toggleDisplayStatus}>Отмена</Button>
                    </div>
                </div>

                {/* </Stack> */}
            </Stack>
        </form>
    );
};
export default AdditionalReviewForm;
