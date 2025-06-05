import React, { useState } from "react";

import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import ChangePasswordForm from "../../Components/forms/changePasswordForm/ChangePasswordForm";
import {
    useChangeAvatarMutation,
    // useGetFavouriteRestNamesQuery,
} from "../../services/apiSlice";
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
    const { avatar, name, registeredAt, username, email, comments, reviews } = userData;
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

    return (
        <section className="user-data">
            <div className="user-data__header">
                <div className="user-data__header_avatar">
                    <img src={avatar} alt="avatar" />
                </div>
                <div className="user-data__header_greet">Привет, {name}</div>
            </div>
            <div className="user-data__userdata">
                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Логин:</div>
                    <div className="user-data__data-value">{username}</div>
                </div>

                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Электронная почта:</div>
                    <div className="user-data__data-value email">{email}</div>
                </div>
                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Статус:</div>
                    <div className="user-data__data-value">{status}</div>
                </div>
                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Оставлено отзывов:</div>
                    <div className="user-data__data-value">{reviews}</div>
                </div>
                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Написано комментариев:</div>
                    <div className="user-data__data-value">{comments}</div>
                </div>
                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Аккаунт зарегистрирован:</div>
                    <div className="user-data__data-value">{date}</div>
                </div>
                <div className="user-data__userdata_item">
                    <div className="user-data__data-field">Изменить фото профиля:</div>
                    <div className="user-data__data-value">
                        <form>
                            <div className="change-avatar-wrapper">
                                <Button variant="outlined" component="label">
                                    Загрузить фото
                                    <input
                                        type="file"
                                        accept=".png, .jpg, .jpeg, .svg, .ico"
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

                <div className="user-data__userdata_item change-password">
                    <div className="user-data__data-field">
                        <Button className="show-change-fields" onClick={() => changePassButton()}>
                            Изменить пароль
                        </Button>
                    </div>
                    <div className="user-data__data-value">
                        <div className="password-fields hide">
                            <ChangePasswordForm userId={userId!} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserDataSection;
