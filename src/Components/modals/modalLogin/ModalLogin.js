import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import { Stack, TextField, Button } from "@mui/material"

import {
    toggleModalWindowLogin,
    toggleRegisterWindowModal,
    callSnackbar,
    setPassAuth,
} from "../../../reducers/interactive"
import { useLoginMutation } from "../../../services/apiSlice"
import useLocalStorage from "../../../hooks/useLocalStorage"

import "./modalLogin.sass"

const ModalLogin = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const { modalWindowLogin } = useSelector((state) => state.interactive)
    const [sendLogin] = useLoginMutation()
    const { setData } = useLocalStorage()

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
    })

    const onSubmit = (data) => {
        const { login, password } = data
        const loginData = {
            username: login,
            password,
        }
        sendLogin(loginData)
            .unwrap()
            .then(({ message, ...data }) => {
                dispatch(callSnackbar({ text: message, type: "success" }))
                setData(data)
                handleClose()
                dispatch(setPassAuth(true))
            })
            .catch((error) => setErrorMessage(error.data))
    }

    const handleClose = () => {
        dispatch(toggleModalWindowLogin())
        setErrorMessage(null)
        reset()
    }

    const passToRegistration = () => {
        dispatch(toggleModalWindowLogin())
        dispatch(toggleRegisterWindowModal())
    }

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
                                minLength: 4,
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
    )
}

export default ModalLogin
