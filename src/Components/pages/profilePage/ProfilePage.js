import { useState } from "react"
import { Button, TextField, Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { callSnackbar } from "../../../reducers/interactive"

import useLocalStorage from "../../../hooks/useLocalStorage"
import { useChangePasswordMutation } from "../../../services/apiSlice"

import avatar from "../../../assets/avatar.jpg"

import "./profilePage.sass"

const ProfilePage = () => {
    const changePassButton = () => {
        const passwordFields = document.querySelector(".password-fields")
        const changeButton = document.querySelector(".show-change-fields")
        if (passwordFields.classList.contains("hide")) {
            passwordFields.classList.remove("hide")
            passwordFields.classList.add("show")
            changeButton.textContent = "Отменить изменения"
        } else {
            passwordFields.classList.remove("show")
            passwordFields.classList.add("hide")
            changeButton.textContent = "Изменить пароль"
        }
    }
    const { userId } = useParams()

    const { getUserData } = useLocalStorage()
    const { name, registeredAt, status, username, email, comments, reviews } = getUserData()
    const date = new Date(registeredAt).toLocaleString("ru", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

    // if (isLoading) {
    //     return
    // }
    // console.log(passData)

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
                    <div className="profile-page__data-field">
                        <Button className="show-change-fields" onClick={() => changePassButton()}>
                            Изменить пароль
                        </Button>
                    </div>
                    <div className="profile-page__data-value">
                        <div className="password-fields hide">
                            <PasswordForm userId={userId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage

const PasswordForm = ({ userId }) => {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newPassRepeat, setNewPassRepeat] = useState("")
    const [error, setError] = useState({
        oldPassError: "",
        newPassError: "",
        newPassRepeatError: "",
    })
    const [sendData] = useChangePasswordMutation()

    const dispatch = useDispatch()

    const clearForm = () => {
        setOldPass("")
        setNewPass("")
        setNewPassRepeat("")
    }
    const clearErrors = () => {
        setError({
            oldPassError: "",
            newPassError: "",
            newPassRepeatError: "",
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newPass !== newPassRepeat) {
            setError({ ...error, newPassRepeatError: "Пароли не совпадают" })
        } else if (oldPass === "" || oldPass === null || oldPass === undefined) {
            setError({ ...error, oldPassError: "Обязательное поле" })
        } else {
            const data = {
                userId,
                oldPass,
                newPass,
            }

            sendData(data)
                .unwrap()
                .then((res) => {
                    dispatch(callSnackbar({ text: res, type: "success" }))
                    clearForm()
                })
                .catch((err) => setError({ ...error, oldPassError: err.data }))
            clearErrors()
        }
    }

    return (
        <>
            <form>
                <Stack spacing={2} width={250} mb={2}>
                    <TextField
                        label="Старый пароль"
                        size="small"
                        type="password"
                        name="oldPass"
                        value={oldPass}
                        error={!!error.oldPassError}
                        helperText={error.oldPassError}
                        onChange={(e) => setOldPass(e.target.value)}
                    />
                    {/* {errors.oldPass && <div>Some error came</div>} */}
                    <TextField
                        label="Новый пароль"
                        size="small"
                        type="password"
                        name="newPass"
                        value={newPass}
                        error={!!error.newPassError}
                        helperText={error.newPassError}
                        onChange={(e) => setNewPass(e.target.value)}
                    />

                    <TextField
                        label="Новый пароль"
                        size="small"
                        type="password"
                        name="newPassRepeat"
                        value={newPassRepeat}
                        error={!!error.newPassRepeatError}
                        helperText={error.newPassRepeatError}
                        onChange={(e) => setNewPassRepeat(e.target.value)}
                    />

                    <Button variant="outlined" onClick={(e) => handleSubmit(e)}>
                        Подтвердить
                    </Button>
                </Stack>
            </form>
        </>
    )
}
