import React, { useState } from "react";
import { Button } from "@mui/material";

import { useParams } from "react-router-dom";

import ChangePasswordForm from "../../Components/forms/changePasswordForm/ChangePasswordForm";

import {
    useChangeAvatarMutation,
    useGetUserDataQuery,
    // useGetFavouriteRestNamesQuery,
} from "../../services/apiSlice";
import { calculateExperience } from "../../utils/calculateExperience";

import { convertToBase64 } from "../../utils/convertToBase64";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import ServerError from "../ServerError";
import StartBlogForm from "../../Components/forms/startBlogForm/StartBlogForm";
import BlogProfileData from "../../Components/blogProfileData/BlogProfileData";

import "./profilePage.sass";

const ProfilePage: React.FC = () => {
    const [avatarData, setAvatarData] = useState<string | null>(null);
    const changePassButton = () => {
        const passwordFields = document.querySelector(".password-fields") as HTMLElement;
        const changeButton = document.querySelector(".show-change-fields") as HTMLButtonElement;
        if (passwordFields.classList.contains("hide")) {
            passwordFields.classList.remove("hide");
            passwordFields.classList.add("show");
            changeButton.textContent = "Отменить изменения";
        } else {
            passwordFields.classList.remove("show");
            passwordFields.classList.add("hide");
            changeButton.textContent = "Изменить пароль";
        }
    };
    const { userId } = useParams<string>();
    const [sendAvatar] = useChangeAvatarMutation();
    const {
        data: userData,
        isLoading,
        isError,
    } = useGetUserDataQuery(userId as string, {
        skip: !!!userId,
    });
    if (isError) {
        return <ServerError />;
    }
    if (isLoading) {
        return <PageSkeleton />;
    }
    const { avatar, name, registeredAt, username, email, comments, reviews, blogData, bloger } =
        userData!;
    console.log(blogData);
    const status = calculateExperience(reviews);
    const date = new Date(registeredAt).toLocaleString("ru", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const handleFileUpload = async (e: any) => {
        const uploadedFile = e.target.files[0];
        const base64Image = await convertToBase64(uploadedFile);
        setAvatarData(base64Image as string);
    };
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (avatarData) {
            sendAvatar({ userId, avatarData })
                .unwrap()
                .then((res) => console.log(res));
        }
    };

    return (
        <div className="profile-page">
            <h1 className="profile-page__title">Просмотр профиля</h1>
            <div className="profile-page__header">
                <div className="profile-page__header_avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="profile-page__header_greet">Привет, {name}</div>
            </div>
            <div className="profile-page__userdata">
                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Логин:</div>
                    <div className="profile-page__data-value">{username}</div>
                </div>

                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Электронная почта:</div>
                    <div className="profile-page__data-value email">{email}</div>
                </div>
                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Статус:</div>
                    <div className="profile-page__data-value">{status}</div>
                </div>
                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Оставлено отзывов:</div>
                    <div className="profile-page__data-value">{reviews}</div>
                </div>
                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Написано комментариев:</div>
                    <div className="profile-page__data-value">{comments}</div>
                </div>
                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Аккаунт зарегистрирован:</div>
                    <div className="profile-page__data-value">{date}</div>
                </div>
                <div className="profile-page__userdata_item">
                    <div className="profile-page__data-field">Изменить фото профиля:</div>
                    <div className="profile-page__data-value">
                        <form>
                            <Button
                                variant="outlined"
                                component="label"
                                onChange={(e) => handleFileUpload(e)}
                            >
                                Загрузить фото
                                <input type="file" accept=".png, .jpg, .jpeg, .svg, .ico" hidden />
                            </Button>
                            <Button variant="text" onClick={(e) => handleSubmit(e)}>
                                Отправить
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="profile-page__userdata_item change-password">
                    <div className="profile-page__data-field">
                        <Button className="show-change-fields" onClick={() => changePassButton()}>
                            Изменить пароль
                        </Button>
                    </div>
                    <div className="profile-page__data-value">
                        <div className="password-fields hide">
                            <ChangePasswordForm userId={userId!} />
                        </div>
                    </div>
                </div>

                <div className="profile-page__blog-title">Блог</div>
                {bloger ? (
                    <BlogProfileData blogData={blogData!} />
                ) : (
                    <StartBlogForm userId={userId!} />
                )}

                {/* <StartBlogForm userId={userId!} /> */}
            </div>
        </div>
    );
};

export default ProfilePage;
