import React, { useState } from "react";
import { useChangePasswordMutation } from "../../../services/apiSlice";
import { useDispatch } from "react-redux";

import { Button, TextField, Stack } from "@mui/material";

import { callSnackbar } from "../../../reducers/interactive";

import "./changePasswordForm.sass";

interface IPasswordFormProps {
    userId: string;
}

const PasswordForm: React.FC<IPasswordFormProps> = ({ userId }) => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPassRepeat, setNewPassRepeat] = useState("");
    const [error, setError] = useState({
        oldPassError: "",
        newPassError: "",
        newPassRepeatError: "",
    });
    const [sendData] = useChangePasswordMutation();

    const dispatch = useDispatch();

    const clearForm = () => {
        setOldPass("");
        setNewPass("");
        setNewPassRepeat("");
    };
    const clearErrors = () => {
        setError({
            oldPassError: "",
            newPassError: "",
            newPassRepeatError: "",
        });
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        if (newPass !== newPassRepeat) {
            setError({ ...error, newPassRepeatError: "Пароли не совпадают" });
        } else if (oldPass === "" || oldPass === null || oldPass === undefined) {
            setError({ ...error, oldPassError: "Обязательное поле" });
        } else {
            const data = {
                userId,
                oldPass,
                newPass,
            };

            sendData(data)
                .unwrap()
                .then((res) => {
                    dispatch(callSnackbar({ text: res, type: "success" }));
                    clearForm();
                })
                .catch((err) => setError({ ...error, oldPassError: err.data }));
            clearErrors();
        }
    };

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
    );
};

export default PasswordForm;
