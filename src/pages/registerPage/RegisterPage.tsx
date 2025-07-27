import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../types/store";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { callSnackbar } from "../../reducers/interactive";
import { useRegistrationMutation } from "../../services/authApi";

import SmallSpinner from "../../Components/svg/SmallSpinner";
import "./registerPage.scss";

import type { IRegisterData } from "../../types/userData";

interface IRegisterForm {
    username: string;
    name: string;
    surname: string;
    birthDate: null | Date;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const [passError, setPassError] = useState<null | string>(null);
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [userExistError, setUserExistError] = useState<null | string>(null);
    const dispatch = useAppDispatch();
    const [registerUser, { isLoading }] = useRegistrationMutation();
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
            birthDate: null,
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    function onSubmit(data: IRegisterForm) {
        if (data.password !== passwordCheck) {
            return setPassError("Пароли не совпадают");
        }
        const { username, name, surname, birthDate, email, password } = data;
        const newUser: IRegisterData = {
            username,
            name,
            surname,
            birthday: birthDate?.toISOString()!,
            email,
            password,
        };
        registerUser(newUser)
            .unwrap()
            .then((response) => {
                reset();
                setPassError(null);
                setPasswordCheck("");
                setUserExistError(null);
                dispatch(callSnackbar({ text: response.message, type: "success" }));
                navigate("/login", { replace: true });
            })
            .catch(({ data }) => setUserExistError(data));
    }
    return (
        <div className="register-page">
            <div className="register-page__content">
                <div className="register-page__title">
                    Зарегистрируйтесь, чтобы получить доступ ко всем возможностям WEATS
                </div>
                <form className="register-page__form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        spacing={3}
                        width={"80%"}
                        mb={2}
                        sx={{ margin: "0 auto", marginTop: "30px" }}
                    >
                        <TextField
                            label="Никнейм на WEATS *"
                            {...register("username", {
                                required: "Придумайте никнейм",
                            })}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            label="Ваше имя *"
                            {...register("name", {
                                required: "Введите ваше имя",
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="Ваша фамилия"
                            {...register("surname", { maxLength: 20 })}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name="birthDate"
                                control={control}
                                rules={{
                                    required: "Заполните дату рождения",
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        format="DD/MM/YYYY"
                                        label="Дата рождения *"
                                        sx={{ width: "200px" }}
                                        disableFuture
                                        slotProps={{
                                            textField: {
                                                error: !!errors.birthDate,
                                                helperText: errors.birthDate?.message,
                                            },
                                        }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        <TextField
                            label="Электронная почта *"
                            {...register("email", {
                                required: "Введите корректный адрес электронной почты",
                                pattern: /^\S+@\S+\.\S+$/,
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            label="Придумайте пароль *"
                            type="password"
                            {...register("password", {
                                required: "Придумайте пароль. Минимум 8 символов. ",
                                minLength: {
                                    value: 8,
                                    message: "Минимум 8 символов",
                                },
                            })}
                            error={!!errors.password}
                        />
                        <TextField
                            label="Повторите пароль *"
                            type="password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            error={!!errors.password || !!passError}
                            helperText={errors.password?.message || passError}
                        />
                        <div className="register-page__actions">
                            {isLoading ? (
                                <div style={{ height: "50px", width: "50px" }}>
                                    <SmallSpinner />
                                </div>
                            ) : (
                                <Button type="submit">Зарегистрироваться</Button>
                            )}
                            <Button />
                        </div>
                        <div className="register-page__error">{userExistError}</div>
                    </Stack>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
