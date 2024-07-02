import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Stack, Button, Alert } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

import SmallSpinner from "../../svg/SmallSpinner";

import { useAddDonerArticleMutation } from "../../../services/donersApi";

import "./addDonerArticleForm.sass";

interface IAddDonerArticleFormProps {
    displayState: boolean;
    toggleDisplay: () => void;
}

type TAlerts = "success" | "info" | "warning" | "error";

const AddDonerArticleForm: React.FC<IAddDonerArticleFormProps> = ({
    displayState,
    toggleDisplay,
}) => {
    const displayForm = displayState ? "show" : "hide";
    const [btnStatus, setBtnStatus] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: "",
            subtitle: "",
            short_description: "",
            text: "",
            bloquote: "",
            rating: "",
            author: "",
        },
    });

    const [addDonerArticle, { isLoading, isSuccess, isError }] = useAddDonerArticleMutation();

    const onSubmit = (formData: any) => {
        setBtnStatus(true);
        addDonerArticle(formData)
            .unwrap()
            .then((response) => {
                if (response === "Success") {
                    reset();
                    setBtnStatus(false);
                    toggleDisplay();
                }
            })
            .catch((error) => {
                console.log(error);
                setBtnStatus(false);
            });
    };

    const postAlert = (type: TAlerts, text: string) => {
        return (
            <Alert severity={type} className="add-doner-article-form__alert">
                {text}
            </Alert>
        );
    };

    const loading = (
        <div className="add-doner-article-form__spinner">
            <SmallSpinner />
        </div>
    );

    return (
        <form className={`add-doner-article-form ${displayForm}`} onSubmit={handleSubmit(onSubmit)}>
            <h3 className="add-doner-article-form__title">Форма добавления статьи:</h3>
            <Stack spacing={3} width={"100%"}>
                <TextField
                    label="Название заведения"
                    {...register("title", {
                        required: "Обязательное поле",
                        minLength: { value: 2, message: "Слишком короткое название" },
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <TextField
                    label="Подзаголовок"
                    multiline
                    minRows={2}
                    {...register("subtitle", {
                        required: "Обязательное поле",
                        minLength: { value: 5, message: "Минимум 50 символов" },
                    })}
                    error={!!errors.subtitle}
                    helperText={errors.subtitle?.message}
                />
                <TextField
                    label="Короткое описания"
                    multiline
                    minRows={2}
                    {...register("short_description", {
                        required: "Обязательное поле",
                        minLength: { value: 5, message: "Минимум 50 символов" },
                    })}
                    error={!!errors.short_description}
                    helperText={errors.short_description?.message}
                />
                <TextField
                    label="Полное описание"
                    multiline
                    minRows={4}
                    {...register("text", {
                        required: "Обязательное поле",
                        minLength: { value: 2, message: "Минимум 200 символов" },
                    })}
                    error={!!errors.text}
                    helperText={errors.text?.message}
                />
                <TextField
                    label="Цитата"
                    multiline
                    minRows={2}
                    {...register("bloquote", {
                        minLength: { value: 3, message: "Минимум 30 символов" },
                    })}
                    error={!!errors.bloquote}
                    helperText={errors.bloquote?.message}
                />
                <TextField
                    label="Оценка"
                    size="small"
                    {...register("rating", {
                        required: "Обязательное поле",
                        min: { value: 1, message: "В пределах от 1 до 5" },
                        max: { value: 5, message: "В пределах от 1 до 5" },
                        pattern: {
                            value: /\d/,
                            message: "Должно быть число",
                        },
                    })}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                />
                <TextField
                    label="Автор"
                    size="small"
                    {...register("author", {
                        required: "Обязательное поле",
                    })}
                    error={!!errors.author}
                    helperText={errors.author?.message}
                />
            </Stack>
            <div className="add-doner-article-form__wrapper">
                <Button
                    type="submit"
                    disabled={btnStatus}
                    className="add-doner-article-form__btn-submit"
                >
                    Отправить <PublishIcon className="add-doner-article-form__icon" />
                </Button>
                {isLoading ? loading : null}
                {isSuccess ? postAlert("success", "Статья добавлена") : null}
                {isError ? postAlert("error", "Ошибка добавления") : null}
            </div>
        </form>
    );
};

export default AddDonerArticleForm;
