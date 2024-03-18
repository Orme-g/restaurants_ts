import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { Button } from "@mui/material"

import {
    toggleRegisterWindowModal,
    toggleModalWindowLogin,
    callSnackbar,
} from "../../../reducers/interactive"
import { useRegistrationMutation } from "../../../services/apiSlice"

import "./modalRegister.sass"

const ModalRegister = () => {
    const [passError, setPassError] = useState(null)
    const [userExistError, setUserExistError] = useState(null)
    const dispatch = useDispatch()
    const modalWindowRegister = useSelector((state) => state.interactive.modalWindowRegister)

    const [registerUser] = useRegistrationMutation()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {},
    })

    function onSubmit(data) {
        if (data.password1 !== data.password2) {
            return setPassError("Пароли не совпадают")
        }
        const { username, name, surname, birthday, email, password1 } = data
        const newUser = {
            username,
            name,
            surname,
            birthday,
            email,
            password: password1,
        }
        registerUser(newUser)
            .unwrap()
            .then(({ message }) => {
                reset()
                setPassError(null)
                setUserExistError(null)
                dispatch(callSnackbar({ text: message, type: "success" }))
                dispatch(toggleRegisterWindowModal())
                dispatch(toggleModalWindowLogin())
            })
            .catch(({ data }) => setUserExistError(data))
    }

    function handleClose() {
        dispatch(toggleRegisterWindowModal())
        setUserExistError(null)
        reset()
    }

    return (
        <Dialog open={modalWindowRegister} onClose={() => handleClose()}>
            <DialogTitle>Регистрация</DialogTitle>
            <DialogContent>
                <DialogContentText>Регистрация нового пользователя</DialogContentText>
                <DialogContentText sx={{ fontSize: "14px" }} mt={1}>
                    Поля со звёздочкой<sup>*</sup> обязательные к заполнению
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-line">
                        <label className="form-label" htmlFor="username">
                            Имя пользователя:<sup>*</sup>
                        </label>
                        <input
                            className="form-input"
                            placeholder="Имя пользователя"
                            name="username"
                            {...register("username", {
                                required: "Введите имя пользователя",
                            })}
                        />
                    </div>
                    <p className="helper-text">{errors.username?.message}</p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="name">
                            Ваше имя:<sup>*</sup>
                        </label>
                        <input
                            className="form-input"
                            placeholder="Ваше имя"
                            name="name"
                            {...register("name", {
                                required: "Введите ваше имя",
                            })}
                        />
                    </div>
                    <p className="helper-text">{errors.name?.message}</p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="surname">
                            Ваша фамилия:
                        </label>
                        <input
                            className="form-input"
                            placeholder="Фамилия"
                            name="surname"
                            {...register("surname", {})}
                        />
                    </div>
                    <p className="helper-text"></p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="birthday">
                            Дата рождения:<sup>*</sup>
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            placeholder="Дата рождения"
                            name="birthday"
                            {...register("birthday", {
                                required: "Выберите дату рождения",
                            })}
                        />
                    </div>
                    <p className="helper-text">{errors.birthday?.message}</p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="email">
                            Электронная почта:
                        </label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Email"
                            name="email"
                            {...register("email", {
                                pattern: /^\S+@\S+\.\S+$/,
                            })}
                        />
                    </div>
                    <p className="helper-text">{errors.email?.message}</p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="password1">
                            Придумайте пароль:<sup>*</sup>
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Пароль"
                            name="password1"
                            {...register("password1", {
                                minLength: 8,
                            })}
                        />
                    </div>
                    <p className="helper-text">
                        {errors.password1?.type === "minLength" ? "Минимум 8 символов" : ""}
                    </p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="password2">
                            Повторите пароль:<sup>*</sup>
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Повторите пароль"
                            name="password2"
                            {...register("password2", {
                                minLength: 8,
                            })}
                        />
                    </div>
                    <p className="helper-text">
                        {errors.password2?.type === "minLength" ? "Минимум 8 символов" : ""}
                        {passError}
                    </p>
                    <p className="helper-text">{userExistError}</p>
                    <div className="form-line">
                        <Button type="submit">Регистрация</Button>
                        <Button onClick={() => handleClose()}>Отмена</Button>
                    </div>
                </form>
                <DevTool control={control} />
            </DialogContent>
        </Dialog>
    )
}

export default ModalRegister
