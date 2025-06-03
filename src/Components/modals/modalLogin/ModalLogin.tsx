import React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../types/store";
// import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Stack, TextField, Button } from "@mui/material";

import {
    toggleModalWindowLogin,
    toggleRegisterWindowModal,
    callSnackbar,
    setPassAuth,
    updateUserData,
} from "../../../reducers/interactive";
import { useLoginMutation } from "../../../services/apiSlice";
import useLocalStorage from "../../../hooks/useLocalStorage";

import "./modalLogin.scss";

interface IFormData {
    login: string;
    password: string;
}

const ModalLogin = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useAppDispatch();
    const { modalWindowLogin } = useAppSelector((state) => state.interactive);
    const [sendLogin] = useLoginMutation();
    const { setData } = useLocalStorage();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
    });

    const onSubmit = (data: IFormData) => {
        const { login, password } = data;
        const loginData = {
            username: login,
            password,
        };
        sendLogin(loginData)
            .unwrap()
            .then(({ message, ...data }) => {
                const { _id } = data;
                dispatch(callSnackbar({ text: message, type: "success" }));
                setData(data);
                handleClose();
                dispatch(setPassAuth(true));
                dispatch(updateUserData(_id));
            })
            .catch((error) => setErrorMessage(error.data));
    };

    const handleClose = () => {
        dispatch(toggleModalWindowLogin());
        setErrorMessage(null);
        reset();
    };

    const passToRegistration = () => {
        dispatch(toggleModalWindowLogin());
        dispatch(toggleRegisterWindowModal());
    };

    return (
        <Dialog open={modalWindowLogin} onClose={() => handleClose()}>
            <DialogTitle>Вход в аккаунт</DialogTitle>
            <DialogContent>
                <DialogContentText mb={2}>
                    Войдите в систему, чтобы открыть все возможности Whereats
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} width={300} mb={2}>
                        <TextField
                            label="Логин"
                            size="small"
                            {...register("login", {
                                required: "Введите логин",
                            })}
                            error={!!errors.login}
                            helperText={errors.login?.message}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            size="small"
                            {...register("password", {
                                required: "Введите пароль",
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <div className="error-message">{errorMessage}</div>
                        <div>
                            <Button size="small" sx={{ fontSize: "12px" }}>
                                Восстановить пароль
                            </Button>
                            <Button
                                size="small"
                                sx={{ fontSize: "12px" }}
                                onClick={() => passToRegistration()}
                            >
                                Регистрация
                            </Button>
                        </div>
                    </Stack>
                    <Button type="submit">Войти</Button>
                    <Button onClick={() => handleClose()}>Отмена</Button>
                </form>
                <DevTool control={control} />
            </DialogContent>
        </Dialog>
    );
};

export default ModalLogin;
