// When all tested - working - delete Login modal component
import React, { useState } from "react";
import { useAppDispatch } from "../../types/store";
import { useForm } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { callSnackbar, setUserDataAndAuth, setIsAuth } from "../../reducers/interactive";
import { useLoginMutation, useLazyMeQuery } from "../../services/authApi";
// import useLocalStorage from "../../hooks/useLocalStorage";

interface IFormData {
    login: string;
    password: string;
}

import "./loginPage.scss";

const LoginPage: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useAppDispatch();
    const [sendLogin] = useLoginMutation();
    const [getUserData] = useLazyMeQuery();
    // const { setData } = useLocalStorage();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
    });
    function onSubmit(data: IFormData) {
        const { login, password } = data;
        const loginData = {
            username: login,
            password,
        };
        sendLogin(loginData)
            .unwrap()
            .then(({ message }) => {
                // const { _id } = data;
                dispatch(callSnackbar({ text: message, type: "success" }));
                reset();
                getUserData()
                    .unwrap()
                    .then((userData) => {
                        dispatch(setUserDataAndAuth(userData));
                    });
                navigate(from, { replace: true });
            })
            .catch((error) => setErrorMessage(error.data));
    }
    return (
        <div className="login-page">
            <div className="login-page__content">
                <div className="login-page__title">Войдите в свой аккаунт на WEATS:</div>
                <form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        spacing={2}
                        width={350}
                        mb={2}
                        sx={{ margin: "0 auto", marginTop: "30px" }}
                    >
                        <TextField
                            label="Логин"
                            size="medium"
                            {...register("login", {
                                required: "Введите логин",
                            })}
                            error={!!errors.login}
                            helperText={errors.login?.message}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            size="medium"
                            {...register("password", {
                                required: "Введите пароль",
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <div className="error-message">{errorMessage}</div>
                    </Stack>
                    <div className="login-page__actions">
                        <Button type="submit">Войти</Button>
                        <Link to={"/register"} className="login-page__link">
                            Регистрация
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
