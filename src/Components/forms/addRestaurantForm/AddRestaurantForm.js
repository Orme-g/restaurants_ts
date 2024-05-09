import React from "react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../types/store";
// import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form";
import {
    TextField,
    Stack,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    OutlinedInput,
    Alert,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { addNewRestaurant } from "../../../reducers/restaurants";

import SmallSpinner from "../../spinner/SmallSpinner";

import "./addRestaurantForm.sass";

const AddRestaurantForm = ({ displayState, toggleDisplay }) => {
    const displayForm = displayState ? "show" : "hide";
    const [cousine, setCousine] = useState([]);
    const { serverReply } = useAppSelector((state) => state.restaurants);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            short_description: "",
            description: "",
            adress: "",
            bill: "",
            phone: "",
        },
    });

    const cousines = [
        "Итальянская",
        "Японская",
        "Французская",
        "Русская",
        "Сербская",
        "Вегетарианская",
        "Азиатская",
        "Американская",
        "Индийская",
        "Паназиатская",
        "Мексиканская",
        "Грузинская",
        "Средиземноморская",
    ];

    const postAlert = (type, text) => {
        return (
            <Alert severity={type} className="add-restaurant-form__alert">
                {text}
            </Alert>
        );
    };

    const loading = (
        <div className="add-restaurant-form__spinner">
            <SmallSpinner />
        </div>
    );
    const handleSelect = (event) => {
        const {
            target: { value },
        } = event;
        setCousine(typeof value === "string" ? value.split(",") : value);
    };

    const onSubmit = (data) => {
        console.log(data);
        dispatch(addNewRestaurant(JSON.stringify(data)));
        reset();
        setCousine([]);
        // toggleDisplay()
    };
    return (
        <form className={`add-restaurant-form ${displayForm}`} onSubmit={handleSubmit(onSubmit)}>
            <div className="add-restaurant-form__title">Форма добавления ресторана:</div>
            <Stack spacing={3} width={"100%"}>
                <TextField
                    label="Название ресторана"
                    {...register("name", { required: "Введите название" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    label="Краткое описание"
                    multiline
                    minRows={2}
                    {...register("short_description", {
                        required: "Обязательное поле",
                        minLength: {
                            // value: 20,
                            value: 1,
                            message: "Минимум 20 символов",
                        },
                    })}
                    error={!!errors.short_description}
                    helperText={errors.short_description?.message}
                />
                <TextField
                    label="Полное описание"
                    multiline
                    minRows={4}
                    {...register("description", {
                        required: "Обязательное поле",
                        minLength: {
                            // value: 100,
                            value: 1,
                            message: "Минимум 100 символов",
                        },
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <FormControl sx={{ width: 400 }}>
                    <InputLabel id="cousine-select">Кухня</InputLabel>
                    <Select
                        id="cousine-select"
                        value={cousine}
                        multiple
                        onChange={handleSelect}
                        input={
                            <OutlinedInput
                                label="Кухня"
                                {...register("cousine", {
                                    required: "Обязательное поле",
                                })}
                                error={!!errors.cousine}
                            />
                        }
                    >
                        {cousines.map((cousine) => (
                            <MenuItem key={cousine} value={cousine}>
                                {cousine}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Адрес ресторана"
                    {...register("adress", {
                        required: "Обязательное поле",
                    })}
                    error={!!errors.adress}
                    helperText={errors.adress?.message}
                />
                <TextField
                    label="Средний чек"
                    {...register("bill", {
                        required: "Обязательное поле",
                        min: {
                            value: 99,
                            message: "Минимум 99",
                        },
                    })}
                    error={!!errors.bill}
                    helperText={errors.bill?.message}
                />
                <TextField
                    label="Номер телефона"
                    {...register("phone", {
                        required: "Обязательное поле",
                        pattern: {},
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
            </Stack>
            <div className="add-restaurant-form__wrapper">
                <Button type="submit" disabled={false} className="add-restaurant-form__btn-submit">
                    Отправить <PublishIcon className="add-restaurant-form__icon" />
                </Button>
                {serverReply === "Sending" ? loading : null}
                {serverReply === "Success" ? postAlert("success", "Ресторан добавлен") : null}
                {serverReply === "Failed" ? postAlert("error", "Ошибка добавления") : null}
            </div>
        </form>
    );
};

export default AddRestaurantForm;
