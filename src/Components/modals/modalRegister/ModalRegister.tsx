import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../types/store";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button } from "@mui/material";

import {
    toggleRegisterWindowModal,
    // toggleModalWindowLogin,
    callSnackbar,
} from "../../../reducers/interactive";
import { useRegistrationMutation } from "../../../services/authApi";

import "./modalRegister.scss";

import type { IRegisterData } from "../../../types/userData";

const ModalRegister: React.FC = () => {
    const [passError, setPassError] = useState<null | string>(null);
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [userExistError, setUserExistError] = useState<null | string>(null);
    const dispatch = useAppDispatch();
    const modalWindowRegister = useAppSelector((state) => state.interactive.modalWindowRegister);

    const [registerUser] = useRegistrationMutation();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            username: "",
            name: "",
            surname: "",
            birthday: null,
            email: "",
            password: "",
        },
    });

    function onSubmit(data: IRegisterData) {
        if (data.password !== passwordCheck) {
            return setPassError("Пароли не совпадают");
        }
        const { username, name, surname, birthday, email, password } = data;
        const newUser = {
            username,
            name,
            surname,
            birthday,
            email,
            password,
        };
        console.log(newUser);
        // registerUser(newUser)
        //     .unwrap()
        //     .then((response) => {
        //         reset();
        //         setPassError(null);
        //         setPasswordCheck("");
        //         setUserExistError(null);
        //         dispatch(callSnackbar({ text: response.message, type: "success" }));
        //         dispatch(toggleRegisterWindowModal());
        //         // dispatch(toggleModalWindowLogin());
        //     })
        //     .catch(({ data }) => setUserExistError(data));
    }

    function handleClose() {
        dispatch(toggleRegisterWindowModal());
        setPassError(null);
        setPasswordCheck("");
        setUserExistError(null);
        reset();
    }

    return (
        <Dialog open={modalWindowRegister} onClose={() => handleClose()}>
            <DialogTitle>Регистрация</DialogTitle>
            <DialogContent>
                <DialogContentText>Регистрация нового пользователя</DialogContentText>
                <DialogContentText sx={{ fontSize: "0.9rem" }} mt={1}>
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
                            {...register("email", {
                                pattern: /^\S+@\S+\.\S+$/,
                            })}
                        />
                    </div>
                    <p className="helper-text">{errors.email?.message}</p>

                    <div className="form-line">
                        <label className="form-label" htmlFor="password">
                            Придумайте пароль:<sup>*</sup>
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Пароль"
                            {...register("password", {
                                minLength: 8,
                            })}
                        />
                    </div>
                    <p className="helper-text">
                        {/* {errors.password?.type === "minLength" ? "Минимум 8 символов" : ""} */}
                    </p>
                    <div className="form-line">
                        <label className="form-label" htmlFor="password2">
                            Повторите пароль:<sup>*</sup>
                        </label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Повторите пароль"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            // {...register("password2", {
                            //     minLength: 8,
                            // })}
                        />
                    </div>
                    <p className="helper-text">
                        {errors.password?.type === "minLength" ? "Минимум 8 символов" : ""}
                        {/* {errors.password2?.type === "minLength" ? "Минимум 8 символов" : ""} */}
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
    );
};

export default ModalRegister;
