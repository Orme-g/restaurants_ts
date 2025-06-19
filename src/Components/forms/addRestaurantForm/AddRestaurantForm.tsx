// fix any
import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../../types/store";
import { useForm } from "react-hook-form";
import {
    TextField,
    Stack,
    Button,
    IconButton,
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { addNewRestaurant } from "../../../reducers/restaurants";

import SmallSpinner from "../../svg/SmallSpinner";
import SubwayIcon from "../../svg/subwayIcon";
import { subwaySpb } from "../../../data/subwaysLists";
import { cousines } from "../../../data/cousines";

import "./addRestaurantForm.scss";

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
interface ISelectedFile {
    file: File;
    url: string;
}

const AddRestaurantForm: React.FC<IAddRestaurantFormProps> = ({ displayState, toggleDisplay }) => {
    const { line1, line2, line3, line4, line5 } = subwaySpb;
    const displayForm = displayState ? "show" : "hide";
    const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[] | null>(null);
    const [titleImageName, setTitleImageName] = useState<string | null>(null);
    const [showAddImagesNotice, setShowAddImagesNotice] = useState<boolean>(false);
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
            bill: null,
            phone: "",
            cousine: [""],
            city: "",
            coordinates: "",
            subway: [""],
        },
    });
    useEffect(() => {
        return () => {
            if (selectedFiles) {
                revokeURLs(selectedFiles);
            }
        };
    }, []);
    useEffect(() => {
        if (selectedFiles?.length === 0) {
            setSelectedFiles(null);
        }
    }, [selectedFiles]);
    const postAlert = (type: TAlerts, text: string) => {
        return (
            <Alert severity={type} className="add-restaurant-form__alert">
                {text}
            </Alert>
        );
    };
    const inputRef = useRef<HTMLInputElement>(null);
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
    const handleSelectFiles = (files: File[]) => {
        console.log("Handle!");
        setSelectedFiles(
            files?.map((file) => {
                return { file, url: URL.createObjectURL(file) };
            })
        );
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    const handleDeletePreviewImage = (image: File) => {
        const removedImage = selectedFiles?.find(({ file }) => file === image);
        const filteredFiles = selectedFiles?.filter(({ file }) => file !== image);
        if (removedImage) {
            URL.revokeObjectURL(removedImage.url);
        }
        if (filteredFiles) {
            setSelectedFiles(filteredFiles);
        }
        if (image.name === titleImageName) {
            setTitleImageName(null);
        }
    };
    const handleSelectTitleImage = (name: string) => {
        setTitleImageName(name);
    };
    const revokeURLs = (files: ISelectedFile[]) => {
        files?.forEach((file) => URL.revokeObjectURL(file.url));
    };

    const onSubmit = (data: IAddRestaurant) => {
        const formData = new FormData();
        if (!selectedFiles) {
            setShowAddImagesNotice(true);
            return;
        }
        if (!titleImageName) {
            return;
        }
        setShowAddImagesNotice(false);
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    formData.append(key, item);
                });
            } else {
                formData.append(key, String(value));
            }
        });
        if (selectedFiles) {
            selectedFiles.forEach(({ file }) => {
                formData.append("images", file);
            });
        }

        formData.append("titleImageName", titleImageName);

        // for (const [key, value] of formData) {
        //     console.log(key, value);
        // }
        // dispatch(addNewRestaurant(formData))
        //     .unwrap()
        //     .then((payload) => {
        //         console.log(payload);
        //         if (payload.message === "success") {
        //             reset();
        //             setCousine([]);
        //             setSubway([]);
        //             setCity("");
        //             revokeURLs(selectedFiles);
        //             setSelectedFiles([]);
        //         } else if (payload.message === "error") {
        //             console.log("Ошибка отправки");
        //         }
        //     });
    };
    const imagePreviews = selectedFiles?.map(({ file, url }) => {
        const id = nanoid();
        return (
            <div
                className={`preview-wrapper ${
                    file.name === titleImageName ? "selected-preview" : ""
                }`}
                key={id}
            >
                <img
                    src={url}
                    alt="image-preview"
                    onClick={() => handleSelectTitleImage(file.name)}
                />
                <IconButton
                    onClick={() => handleDeletePreviewImage(file)}
                    style={{ position: "absolute", top: "0", right: "0" }}
                >
                    <HighlightOffIcon fontSize="large" style={{ color: "#dfdfdf" }} />
                </IconButton>
            </div>
        );
    });
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
                <div style={{ display: "flex" }}>
                    <label>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                if (e.target.files) handleSelectFiles(Array.from(e.target.files));
                            }}
                            style={{ display: "none" }}
                        />
                        <Button
                            component="span"
                            className="add-restaurant-form__button"
                            variant="outlined"
                        >
                            Загрузить фото
                        </Button>
                    </label>
                    {showAddImagesNotice ? (
                        <div
                            style={{
                                marginLeft: "15px",
                                lineHeight: "50px",
                                color: "rgb(221, 39, 39)",
                            }}
                        >
                            Добавьте изображения
                        </div>
                    ) : null}
                </div>

                <div
                    className="add-restaurant-form__images-previews"
                    style={{ display: imagePreviews ? "flex" : "none" }}
                >
                    {imagePreviews}
                </div>
                <div
                    className={`add-restaurant-form__helper-text ${
                        titleImageName ? "selected" : ""
                    }`}
                    style={{ display: imagePreviews ? "block" : "none" }}
                >
                    {selectedFiles ? "Выберите титульное фото ресторана." : null}
                </div>
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
                            {/* <SubwaySelectList stationsList={subwaySpb} /> */}
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
                            ))}{" "}
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
                    label="Координаты для Яндекс Карт (59.939868, 30.314547)"
                    {...register("coordinates", {
                        required: "Обязательное поле",
                    })}
                    error={!!errors.coordinates}
                    helperText={errors.coordinates?.message}
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
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                />
            </Stack>
            <div className="add-restaurant-form__wrapper">
                {/* <Button type="submit" disabled={false} className="add-restaurant-form__btn-submit"> */}
                <Button
                    type="submit"
                    disabled={false}
                    className="add-restaurant-form__button submit-button"
                >
                    Отправить <PublishIcon className="add-restaurant-form__icon" />
                </Button>
                {serverReply === "Sending" ? loading : null}
                {serverReply === "success" ? postAlert("success", "Ресторан добавлен") : null}
                {serverReply === "Failed" || serverReply === "error"
                    ? postAlert("error", "Ошибка добавления")
                    : null}
            </div>
        </form>
    );
};

export default AddRestaurantForm;
