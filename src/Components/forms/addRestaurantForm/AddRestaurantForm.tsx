import React, { useState, useEffect, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useForm, Controller } from "react-hook-form";
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
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAddNewRestaurantMutation } from "../../../services/restaurantsApi";

import SelectSubway from "../../selectSubway/SelectSubway";
import SmallSpinner from "../../svg/SmallSpinner";
import { cousines } from "../../../data/cousines";

import "./addRestaurantForm.scss";

import type { IAddNewRestaurant } from "../../../types/restaurantsTypes";

interface IAddRestaurantFormProps {
    displayState: boolean;
    toggleDisplay: () => void;
}
type TAlerts = "success" | "info" | "warning" | "error";
interface ISelectedFile {
    file: File;
    url: string;
}

const AddRestaurantForm: React.FC<IAddRestaurantFormProps> = ({ displayState }) => {
    const displayForm = displayState ? "show" : "hide";
    const [selectedFiles, setSelectedFiles] = useState<ISelectedFile[] | null>(null);
    const [selectedFilesError, setSelectedFilesError] = useState<string | null>(null);
    const [titleImageName, setTitleImageName] = useState<string | null>(null);
    const [showAddImagesNotice, setShowAddImagesNotice] = useState<boolean>(false);
    const [cousine, setCousine] = useState<string[]>([]);
    const [city, setCity] = useState("");
    // const [subway, setSubway] = useState<string[] | null>(null);
    const [addRestaurant, { isLoading, isError, isSuccess }] = useAddNewRestaurantMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
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
            subway: [],
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
    const handleSelectCousine = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setCousine(typeof value === "string" ? value.split(",") : value);
    };

    const handleSelectCity = (event: SelectChangeEvent) => {
        setCity(event.target.value as string);
    };

    // const handleSelectSubway = (selected: string[]) => {
    //     setSubway(selected);
    // };
    const handleSelectFiles = (files: File[]) => {
        setSelectedFilesError(null);
        setTitleImageName(null);
        if (files.length > 12) {
            setSelectedFilesError("Максимальное количество фото - 12.");
            return;
        }
        for (const file of files) {
            if (file.size / (1024 * 1024) > 5) {
                setSelectedFilesError("Размер каждого загружаемого фото должен быть менее 5мб.");
                return;
            }
        }

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

    const onSubmit = (data: IAddNewRestaurant) => {
        const formData = new FormData();
        if (selectedFilesError) {
            return;
        }
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
        //     console.log(key, ": ", value);
        // }
        addRestaurant(formData)
            .unwrap()
            .then(() => {
                reset();
                setCousine([]);
                // setSubway([]);
                setCity("");
                revokeURLs(selectedFiles);
                setSelectedFiles([]);
            });
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
                            value: 20,
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
                            value: 100,
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
                            variant="outlined"
                            color="primary"
                            sx={{
                                height: "50px",
                            }}
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
                <div className="add-restaurant-form__helper-text">{selectedFilesError}</div>
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
                    <div className="add-restaurant-form__select-subway">
                        {/* <SelectSubway handleChange={handleSelectSubway} multiple={true} /> */}
                        <Controller
                            name="subway"
                            control={control}
                            rules={{ required: "Выберите хотя бы одну станцию метро" }}
                            render={({ field }) => (
                                <>
                                    <SelectSubway handleChange={field.onChange} multiple={true} />
                                </>
                            )}
                        />
                    </div>
                    {errors.subway ? (
                        <span className="add-restaurant-form__subway-error">
                            {errors.subway.message}
                        </span>
                    ) : null}
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
                <Button
                    type="submit"
                    disabled={isLoading}
                    variant="outlined"
                    sx={{
                        height: "50px",
                    }}
                >
                    Отправить <PublishIcon className="add-restaurant-form__icon" />
                </Button>
                {isLoading ? loading : null}
                {isSuccess ? postAlert("success", "Ресторан добавлен") : null}
                {isError ? postAlert("error", "Ошибка добавления") : null}
            </div>
        </form>
    );
};

export default AddRestaurantForm;
