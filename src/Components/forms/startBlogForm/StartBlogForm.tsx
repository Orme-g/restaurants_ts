import React, { useState } from "react";
import { useAppDispatch } from "../../../types/store";
import { useForm } from "react-hook-form";
import { TextField, Stack, Button } from "@mui/material";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { useSetBlogerDataMutation } from "../../../services/userApi";
import { callSnackbar } from "../../../reducers/interactive";

import type { IStartBlogData } from "../../../types/userData";

import "./startBlogForm.scss";

const StartBlogForm: React.FC = () => {
    const [blogAvatar, setBlogAvatar] = useState<string | null>(null);
    const [avatarSizeError, setAvatarSizeError] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
    const [displayBlogForm, setDisplayBlogForm] = useState<boolean>(false);
    const [sendData] = useSetBlogerDataMutation();
    const dispatch = useAppDispatch();
    let margin;
    const {
        register,
        watch,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            blogerName: "",
            blogCity: "",
            aboutMe: "",
        },
    });
    const aboutMe = watch("aboutMe");
    const lettersLeft = 300 - aboutMe.length;
    if (errors.aboutMe) {
        margin = "extra-margin";
    } else {
        margin = null;
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlogAvatar(null);
        setImageName(null);
        if (e.target.files) {
            const uploadedFile = e.target.files[0];
            if (uploadedFile.size / (1024 * 1024) > 1) {
                setAvatarSizeError("Максимальный размер аватарки 5мб.");
                return;
            }
            setImageName(`"${uploadedFile.name}"`);
            const base64Image = await convertToBase64(uploadedFile);
            setBlogAvatar(base64Image);
            setAvatarSizeError(null);
        }
    };

    const onSubmit = async (data: { blogerName: string; blogCity: string; aboutMe: string }) => {
        if (!blogAvatar) {
            return;
        }
        const startBlogData: IStartBlogData = { ...data, blogAvatar };
        sendData(startBlogData)
            .unwrap()
            .then(({ message }) => {
                dispatch(callSnackbar({ text: message, type: "success" }));
                reset();
                setImageName(null);
            })
            .catch(({ data }) => setError("blogerName", { message: data }, { shouldFocus: true }));
    };
    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayBlogForm(e.target.checked);
    };
    const display = displayBlogForm ? "show-with-animation" : "hide-with-animation";
    return (
        <>
            <div className="blog-start">
                <div className="blog-start_label">Вести блог:</div>
                <div className="blog-start_checkbox">
                    <input type="checkbox" onChange={(e) => handleCheckbox(e)} />
                </div>
            </div>

            <form className={`blog__form ${display}`} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <TextField
                        label="Псевдоним для блога"
                        style={{ width: 250 }}
                        {...register("blogerName", {
                            required: "Введите имя",
                            minLength: { value: 2, message: "Минимум 2 символа" },
                            maxLength: { value: 15, message: "Не больше 15 символов" },
                        })}
                        error={!!errors.blogerName}
                        helperText={errors.blogerName?.message}
                    />

                    <TextField
                        label="Откуда вы"
                        style={{ width: 250 }}
                        {...register("blogCity", {
                            required: "Введите название города",
                            minLength: { value: 3, message: "Минимум 3 символа" },
                            maxLength: { value: 15, message: "Не больше 15 символов" },
                        })}
                        error={!!errors.blogCity}
                        helperText={errors.blogCity?.message}
                    />
                    <div className="limited-length_field">
                        <TextField
                            label="Несколько строк о себе"
                            multiline
                            minRows={3}
                            style={{ width: 500 }}
                            {...register("aboutMe", {
                                required: "Напишите кратко что-нибудь о себе",
                                minLength: { value: 10, message: "Минимум 10 символов" },
                                maxLength: { value: 300, message: "Максимум 300 символов" },
                            })}
                            error={!!errors.aboutMe}
                            helperText={errors.aboutMe?.message}
                        />
                        <div className={`limited-length_field letters-count ${margin}`}>
                            {lettersLeft}/300
                        </div>
                    </div>

                    <div className="blog__blog_form upload-image">
                        <div className="upload-image_label">Фото для блога:</div>
                        <Button
                            sx={{
                                marginLeft: "20px",
                            }}
                            variant="outlined"
                            component="label"
                        >
                            Выбрать фото
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => handleFileUpload(e)}
                            />
                        </Button>
                        <div className="upload-image_name">{imageName}</div>
                    </div>
                    <div className="upload-image_helper-text">{avatarSizeError}</div>
                </Stack>
                <Button type="submit" style={{ marginTop: 30, marginLeft: 40 }} variant="contained">
                    Отправить
                </Button>
            </form>
        </>
    );
};

export default StartBlogForm;
