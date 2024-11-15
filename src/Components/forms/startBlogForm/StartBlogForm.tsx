import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { TextField, Stack, Button } from "@mui/material";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { useSetBlogerDataMutation } from "../../../services/apiSlice";
import "./startBlogForm.sass";

interface IStartBlogForm {
    userId: string;
}

const StartBlogForm: React.FC<IStartBlogForm> = ({ userId }) => {
    const [blogAvatar, setBlogAvatar] = useState("");
    const [imageName, setImageName] = useState<string | null>(null);
    const [displayBlogForm, setDisplayBlogForm] = useState<boolean>(false);
    const [sendData] = useSetBlogerDataMutation();
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
            // blogAvatar: null,
        },
    });
    const aboutMe = watch("aboutMe");
    const lettersLeft = 1000 - aboutMe.length;
    if (errors.aboutMe) {
        margin = "extra-margin";
    } else {
        margin = null;
    }

    const handleFileUpload = async (e: any) => {
        const uploadedFile = e.target.files[0];
        setImageName(`"${uploadedFile.name}"`);
        const file = (await convertToBase64(uploadedFile)) as string;
        setBlogAvatar(file);
    };

    const onSubmit = async (data: { blogerName: string; blogCity: string; aboutMe: string }) => {
        sendData({ ...data, blogAvatar, userId })
            .unwrap()
            .then((response) => {
                console.log(response);
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
            <div className="profile-page__blog-start">
                <div className="profile-page__blog-start_label">Вести блог:</div>
                <div className="profile-page__blog-start_checkbox">
                    <input type="checkbox" onChange={(e) => handleCheckbox(e)} />
                </div>
            </div>

            <form
                className={`profile-page__blog_form ${display}`}
                onSubmit={handleSubmit(onSubmit)}
            >
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
                    <div className="about-me_field">
                        <TextField
                            label="Несколько строк о себе"
                            multiline
                            minRows={3}
                            style={{ width: 500 }}
                            {...register("aboutMe", {
                                required: "Напишите кратко что-нибудь о себе",
                                minLength: { value: 10, message: "Минимум 10 символов" },
                                maxLength: { value: 1000, message: "Максимум 1000 символов" },
                            })}
                            error={!!errors.aboutMe}
                            helperText={errors.aboutMe?.message}
                        />
                        <div className={`about-me_field letters-count ${margin}`}>
                            {lettersLeft}/1000
                        </div>
                    </div>

                    <div className="profile-page__blog_form upload-image">
                        <div className="upload-image_label">Фото для блога:</div>
                        <Button
                            className="upload-image_button"
                            variant="outlined"
                            component="label"
                            onChange={(e) => handleFileUpload(e)}
                        >
                            Выбрать фото
                            <input type="file" accept=".png, .jpg, .jpeg, .svg, .ico" hidden />
                        </Button>
                        <div className="upload-image_name">{imageName}</div>
                    </div>
                </Stack>
                <Button type="submit" style={{ marginTop: 30, marginLeft: 40 }} variant="contained">
                    Отправить
                </Button>
            </form>
        </>
    );
};

export default StartBlogForm;
