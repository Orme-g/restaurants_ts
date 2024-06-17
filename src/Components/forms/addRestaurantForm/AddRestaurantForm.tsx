// fix any
import React, { useState } from "react";
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
    SelectChangeEvent,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { addNewRestaurant } from "../../../reducers/restaurants";

import SmallSpinner from "../../svg/SmallSpinner";
import SubwayIcon from "../../svg/subwayIcon";

import "./addRestaurantForm.sass";

import type { IAddRestaurant } from "../../../types/restaurantsTypes";

interface IAddRestaurantFormProps {
    displayState: boolean;
    toggleDisplay: () => void;
}

enum TSubwayColors {
    Red = "#D70138",
    Blue = "#0079CA",
    Green = "#019C47",
    Orange = "#EB7220",
    Purple = "#6D2781",
}

type TAlerts = "success" | "info" | "warning" | "error";

const AddRestaurantForm: React.FC<IAddRestaurantFormProps> = ({ displayState, toggleDisplay }) => {
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
    const line1 = [
        "Девяткино",
        "Гражданский проспект",
        "Академическая",
        "Политехническая",
        "Площадь Мужества",
        "Лесная",
        "Выборгская",
        "Площадь Ленина",
        "Чернышевская",
        "Площадь Восстания",
        "Владимирская",
        "Пушкинская",
        "Технологический институт",
        "Балтийская",
        "Нарвская",
        "Кировский завод",
        "Автово",
        "Ленинский проспект",
        "Проспект Ветеранов",
    ];
    const line2 = [
        "Парнас",
        "Проспект Просвещения",
        "Озерки",
        "Удельная",
        "Пионерская",
        "Чёрная речка",
        "Петроградская",
        "Горьковская",
        "Невский проспект",
        "Сенная площадь",
        "Технологический институт",
        "Фрунзенская",
        "Московские ворота",
        "Электросила",
        "Парк Победы",
        "Московская",
        "Звёздная",
        "Купчино",
    ];
    const line3 = [
        "Беговая",
        "Зенит",
        "Приморская",
        "Василеостровская",
        "Гостиный двор",
        "Маяковская",
        "Площадь Александра Невского",
        "Елизаровская",
        "Ломоносовская",
        "Пролетарская",
        "Обухово",
        "Рыбацкое",
    ];
    const line4 = [
        "Спасская",
        "Достоевская",
        "Лиговский проспект",
        "Площадь Александра Невского",
        "Новочеркасская",
        "Ладожская",
        "Проспект Большевиков",
        "Улица Дыбенко",
    ];
    const line5 = [
        "Комендантский проспект",
        "Старая Деревня",
        "Крестовский остров",
        "Чкаловская",
        "Спортивная",
        "Адмиралтейская",
        "Садовая",
        "Звенигородская",
        "Обводный канал",
        "Волковская",
        "Бухарестская",
        "Международная",
        "Проспект Славы",
        "Дунайская",
        "Шушары",
    ];
    const displayForm = displayState ? "show" : "hide";
    const [cousine, setCousine] = useState([]);
    const [city, setCity] = useState("");
    const [subway, setSubway] = useState([]);
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
            bill: 0,
            phone: "",
            cousine: [""],
            city: "",
            subway: [""],
        },
    });

    const postAlert = (type: TAlerts, text: string) => {
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
    const handleSelectCousine = (event: any) => {
        const {
            target: { value },
        } = event;
        setCousine(typeof value === "string" ? value.split(",") : value);
    };

    const handleSelectCity = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    const handleSelectSubway = (event: any) => {
        const {
            target: { value },
        } = event;
        setSubway(typeof value === "string" ? value.split(",") : value);
    };

    const onSubmit = (data: IAddRestaurant) => {
        dispatch(addNewRestaurant(JSON.stringify(data))).then(({ payload }) => {
            console.log(payload);
            if (payload === "Success") {
                reset();
                setCousine([]);
                setSubway([]);
                setCity("");
            } else if (payload === "Error") {
                console.log("Ошибка отправки");
            }
        });

        // toggleDisplay();
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
                        onChange={handleSelectCousine}
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
                <div>
                    <FormControl sx={{ width: 300 }}>
                        <InputLabel id="city-select">Город</InputLabel>
                        <Select
                            id="city-select"
                            value={city}
                            onChange={handleSelectCity}
                            input={
                                <OutlinedInput
                                    label="Город"
                                    {...register("city", {
                                        required: "Обязательное поле",
                                    })}
                                    error={!!errors.city}
                                />
                            }
                        >
                            <MenuItem value={"Санкт-Петербург"}>Санкт-Петербург</MenuItem>
                            <MenuItem value={"Москва"}>Москва</MenuItem>
                            <MenuItem value={"Екатеринбург"}>Екатеринбург</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: 300, marginLeft: "20px" }}>
                        <InputLabel id="subway-select">Метро</InputLabel>
                        <Select
                            id="subway-select"
                            value={subway}
                            renderValue={(selected) => selected.join(", ")}
                            multiple
                            onChange={handleSelectSubway}
                            input={
                                <OutlinedInput
                                    label="Метро"
                                    {...register("subway", {
                                        required: "Обязательное поле",
                                    })}
                                    error={!!errors.subway}
                                />
                            }
                        >
                            <ListSubheader>Линия 1</ListSubheader>
                            {line1.map((station) => (
                                <MenuItem value={station} key={station}>
                                    <ListItemIcon>
                                        <SubwayIcon color={TSubwayColors.Red} />
                                    </ListItemIcon>
                                    <ListItemText>{station}</ListItemText>
                                </MenuItem>
                            ))}
                            <ListSubheader>Линия 2</ListSubheader>
                            {line2.map((station) => (
                                <MenuItem value={station} key={station}>
                                    <ListItemIcon>
                                        <SubwayIcon color={TSubwayColors.Blue} />
                                    </ListItemIcon>
                                    <ListItemText>{station}</ListItemText>
                                </MenuItem>
                            ))}
                            <ListSubheader>Линия 3</ListSubheader>
                            {line3.map((station) => (
                                <MenuItem value={station} key={station}>
                                    <ListItemIcon>
                                        <SubwayIcon color={TSubwayColors.Green} />
                                    </ListItemIcon>
                                    <ListItemText>{station}</ListItemText>
                                </MenuItem>
                            ))}
                            <ListSubheader>Линия 4</ListSubheader>
                            {line4.map((station) => (
                                <MenuItem value={station} key={station}>
                                    <ListItemIcon>
                                        <SubwayIcon color={TSubwayColors.Orange} />
                                    </ListItemIcon>
                                    <ListItemText>{station}</ListItemText>
                                </MenuItem>
                            ))}
                            <ListSubheader>Линия 5</ListSubheader>
                            {line5.map((station) => (
                                <MenuItem value={station} key={station}>
                                    <ListItemIcon>
                                        <SubwayIcon color={TSubwayColors.Purple} />
                                    </ListItemIcon>
                                    <ListItemText>{station}</ListItemText>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

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
