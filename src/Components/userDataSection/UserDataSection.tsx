// Rewrite DOM manipulations
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import Bookmarks from "@mui/icons-material/BookmarksRounded";
import Bookmark from "@mui/icons-material/BookmarkRounded";
import { useParams } from "react-router-dom";
import ChangePasswordForm from "../../Components/forms/changePasswordForm/ChangePasswordForm";
import { useChangeAvatarMutation } from "../../services/userApi";
import { useAppDispatch } from "../../types/store";
import { calculateExperience } from "../../utils/calculateExperience";
import { convertToBase64 } from "../../utils/convertToBase64";

import "./userDataSection.scss";

import type { IUserData } from "../../types/userData";
import { callSnackbar } from "../../reducers/interactive";

interface IUserDataSection {
    userData: IUserData;
}

const UserDataSection: React.FC<IUserDataSection> = ({ userData }) => {
    const [avatarData, setAvatarData] = useState<string | null>(null);
    const [imageName, setImageName] = useState<string | null>(null);
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
    const [sendAvatar] = useChangeAvatarMutation();
    const { userId } = useParams<string>();
    const dispatch = useAppDispatch();
    const { avatar, name, registeredAt, username, email, comments, reviews, favouriteRestaurants } =
        userData;
    const status = calculateExperience(reviews);
    const date = new Date(registeredAt).toLocaleString("ru", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
    const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0];
            setImageName(`"${uploadedFile.name}"`);
            const base64Image = await convertToBase64(uploadedFile);
            setAvatarData(base64Image);
        }
    };
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (avatarData) {
            sendAvatar({ userId, avatarData })
                .unwrap()
                .then((res) => dispatch(callSnackbar({ text: res, type: "success" })))
                .then(() => {
                    setAvatarData(null);
                    setImageName(null);
                })
                .catch((error) => dispatch(callSnackbar({ text: error, type: "error" })));
        }
    };

    const favoriteRestaursntsList = favouriteRestaurants?.map(([name, id]) => {
        return (
            <Link
                to={`/restaurant/${id}`}
                key={id}
                className="user-data__favorite-restaurants_item"
            >
                <div className="user-data__favorite-restaurants_icon">
                    <Bookmark />
                </div>
                <div className="user-data__favorite-restaurants_name">{name}</div>
            </Link>
        );
    });

    return (
        <section className="user-data">
            <div className="user-data__header">
                <div className="user-data__header_avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="user-data__header_greet">Привет, {name}</div>
            </div>
            <div className="user-data__wrapper">
                <div className="user-data__info">
                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Логин:</div>
                        <div className="user-data__info-value">{username}</div>
                    </div>

                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Электронная почта:</div>
                        <div className="user-data__info-value email">{email}</div>
                    </div>
                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Статус:</div>
                        <div className="user-data__info-value">{status}</div>
                    </div>
                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Оставлено отзывов:</div>
                        <div className="user-data__info-value">{reviews}</div>
                    </div>
                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Комментариев:</div>
                        <div className="user-data__info-value">{comments}</div>
                    </div>
                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Зарегистрирован:</div>
                        <div className="user-data__info-value">{date}</div>
                    </div>
                    <div className="user-data__info-item">
                        <div className="user-data__info-field">Изменить фото профиля:</div>
                        <div className="user-data__info-value">
                            <form>
                                <div className="change-avatar-wrapper">
                                    <Button variant="outlined" component="label">
                                        Загрузить фото
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => handleFileUpload(e)}
                                        />
                                    </Button>
                                    <div className="upload-image_name">{imageName}</div>
                                </div>

                                <Button
                                    type="submit"
                                    style={{ marginTop: 10 }}
                                    variant="contained"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Отправить
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="user-data__info-item change-password">
                        <div className="user-data__info-field">
                            <Button
                                onClick={() => changePassButton()}
                                className="show-change-fields"
                            >
                                Изменить пароль
                            </Button>
                        </div>
                        <div className="user-data__info-value">
                            <div className="password-fields hide">
                                <ChangePasswordForm userId={userId!} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-data__favorites">
                    <div className="user-data__favorites_header">
                        <div className="user-data__favorites_title">Избранное</div>
                        <Bookmarks fontSize="large" className="user-data__favorites_icon" />
                    </div>
                    <div className="user-data__favorites_subtitle">Рестораны:</div>
                    {favouriteRestaurants?.length > 0 ? (
                        <div className="user-data__favorite-restaurants">
                            {favoriteRestaursntsList}
                        </div>
                    ) : (
                        <div className="user-data__favorite-restaurants_empty">
                            Список пуст. Добавить в избранное вы можете на странице ресторана.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserDataSection;
