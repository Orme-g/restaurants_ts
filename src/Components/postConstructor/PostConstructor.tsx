import React, { useState, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Textfield from "./components/Textfield";
import Filefield from "./components/Filefield";
import { convertToBase64 } from "../../utils/convertToBase64";

import { useAddEventMutation } from "../../services/eventsApi";

import "./postConstructor.scss";

type PostType = "doner" | "event" | "blog";
type InputType = "text" | "bloquote" | "photo" | "slider";
interface IFieldData {
    type: InputType;
    id: string;
    value: string | string[] | null;
    error?: string;
}
interface IPostConstructor {
    modalController: (open: boolean) => void;
    type: PostType;
    restaurantData?: { restaurantName: string; restId: string };
}

const PostConstructor: React.FC<IPostConstructor> = ({ modalController, type, restaurantData }) => {
    const [fields, setFields] = useState<IFieldData[] | []>([]);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [titleImage, setTitleImage] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [error, setError] = useState<any>({});
    let refData = useRef<IFieldData[]>([]);

    const [sendData, { isError: errorEvent, isSuccess }] = useAddEventMutation();

    const maxTitleLength = 50;
    const maxSubtitleLength = 100;
    const maxShortDescriptionLength = 200;
    const buttons: InputType[] = ["text", "bloquote", "photo", "slider"];
    const displayButtons = buttons.map((item) => {
        return (
            <button key={item} className="editor__button" onClick={() => buttonHandler(item)}>
                {item.toUpperCase()}
            </button>
        );
    });

    const constructorTitle = (type: PostType) => {
        switch (type) {
            case "blog":
                return "Новая статья в блог";
            case "doner":
                return "Новая статья о лучшей Донерной";
            case "event":
                return "Создание нового события";
        }
    };

    function addFieldToRef(data: IFieldData) {
        const { type, id } = data;
        refData.current = [...refData.current, { type, id, value: "" }];
    }
    function deleteFieldFromRef(id: string) {
        refData.current = [...refData.current.filter((item) => item.id !== id)];
    }

    function modifyRef(id: string, value: string | string[] | null) {
        refData.current.forEach((item) => {
            if (item.id === id) {
                item.value = value;
            }
        });
    }

    const buttonHandler = (type: InputType) => {
        const id = nanoid();
        setFields((fields) => [...fields, { type, id, value: null }]);
        addFieldToRef({ type, id, value: null });
    };
    const displayFields = fields.map((item) => {
        if (item) {
            const { type, id, error } = item;
            if (type === "bloquote" || type === "text") {
                return (
                    <Textfield
                        key={id}
                        type={type}
                        id={id}
                        handleDeleteField={handleDeleteField}
                        modifyRef={modifyRef}
                        error={error}
                    />
                );
            } else if (type === "photo" || type === "slider") {
                return (
                    <Filefield
                        key={id}
                        type={type}
                        id={id}
                        handleDeleteField={handleDeleteField}
                        modifyRef={modifyRef}
                    />
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    });

    function handleDeleteField(id: string) {
        setFields((fields) => [...fields.filter((item) => item.id !== id)]);
        deleteFieldFromRef(id);
    }
    const onImageUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            const base64Image = await convertToBase64(image);
            setTitleImage(base64Image);
        }
    };
    function checkLength(value: string, allowedLength: number, ...extraClasses: string[]) {
        const classes = extraClasses.join(" ");
        const show_error = value.length > allowedLength ? "show_error" : "";
        return (
            <div className={`characters_left ${show_error} ${classes}`}>
                {value.length}/{allowedLength}
            </div>
        );
    }

    function adjustTextarea(textarea: HTMLTextAreaElement) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setShortDescription(e.target.value);
        adjustTextarea(e.target);
    }

    const validateField = (
        // fieldName: keyof typeof error,
        fieldName: string,
        fieldValue: string,
        minLength: number,
        maxLength: number
    ) => {
        if (fieldValue.trim().length < minLength || fieldValue.trim().length > maxLength) {
            setError((error: any) => ({
                ...error,
                [fieldName]: `Длина от ${minLength} до ${maxLength} символов`,
            }));
            document.querySelector(`[name=${fieldName}]`)?.classList.add("textfielf_error");
        } else if (error[fieldName]) {
            const copy = { ...error };
            delete copy[fieldName];
            setError(copy);
            document.querySelector(`[name=${fieldName}]`)?.classList.remove("textfielf_error");
        }
    };
    const validateDate = (fieldValue: string, fieldName: "dateFrom" | "dateTo") => {
        const field = document.querySelector(`[name=${fieldName}]`) as HTMLInputElement;
        if (!fieldValue) {
            field.classList.add("datefield_error");
            setError((error: any) => ({
                ...error,
                date: "Заполните даты, когда проходит событие",
            }));
        } else if (dateFrom > dateTo) {
            field.classList.add("datefield_error");
            setError((error: any) => ({ ...error, date: "Неправильный диапазон дат" }));
        } else if (fieldValue && dateFrom < dateTo && field.classList.contains("datefield_error")) {
            field.classList.remove("datefield_error");
            setError((error: any) => ({ ...error, date: null }));
        }
    };

    const handleSumbit = () => {
        // validateField("title", title, 2, 50);
        // validateField("subtitle", subtitle, 5, 100);
        // validateField("shortDescription", shortDescription, 10, 200);
        // if (type === "event") {
        //     validateDate(dateFrom, "dateFrom");
        //     validateDate(dateTo, "dateTo");
        // }

        let dynamicFieldsError = 0;
        refData.current.forEach((item) => {
            const element = document.getElementById(item.id);
            if (!item.value) {
                if (item.type === "bloquote" || item.type === "text") {
                    element?.classList.add("textfielf_error");
                    dynamicFieldsError++;
                    const copy = [...fields];
                    copy.forEach((field) => {
                        if (field.id === item.id) {
                            field.error =
                                "Поле не должно быть пустым. Заполните либо удалите поле.";
                        }
                    });
                    setFields(copy);
                } else if (item.type === "photo" || item.type === "slider") {
                    element?.classList.add("filefield_error");
                }
            } else if (item.value && element?.classList.contains("textfielf_error")) {
                element?.classList.remove("textfielf_error");
                const copy = [...fields];
                copy.forEach((field) => {
                    if (field.id === item.id) {
                        field.error = "";
                    }
                });
                setFields(copy);
            }
        });
        console.log(dynamicFieldsError > 0 ? "There is error" : "Good, no errors");

        if (dynamicFieldsError === 0) {
            const content = refData.current.map((item) => {
                const { type, value } = item;
                return { [type]: value };
            });
            if (type === "event") {
                let dataToSend: any = {
                    dateStart: new Date(dateFrom),
                    dateFinish: new Date(dateTo),
                    title: title.trim(),
                    title_image: titleImage,
                    subtitle: subtitle.trim(),
                    short_description: shortDescription.trim(),
                    content,
                    restaurantName: restaurantData?.restaurantName,
                    restaurantId: restaurantData?.restId,
                };
                // sendData(dataToSend)
                //     .unwrap()
                //     .then((res) => {
                //         if (res === "Success") {
                //         }
                //     });
                console.log(dataToSend);
            }
        }

        // if (type === "event") {
        //     let dataToSend: any = {
        //         dateFrom,
        //         dateTo,
        //         title: title.trim(),
        //         title_image: titleImage,
        //         subtitle: subtitle.trim(),
        //         short_description: shortDescription.trim(),
        //         content,
        //     };
        //     sendData(dataToSend);
        // }
        // let dataToSend: any = {
        //     title: title.trim(),
        //     title_image: titleImage,
        //     subtitle: subtitle.trim(),
        //     short_description: shortDescription.trim(),
        //     content,
        // };

        // console.log(dataToSend);
    };

    return (
        <>
            <div className="post-constructor__container">
                <div className="editor__instruments">{displayButtons}</div>
                <div className="editor__post-type">{constructorTitle(type)}</div>
                {restaurantData && type === "event" ? (
                    <>
                        <div className="editor__restaurant">
                            Ресторан "{restaurantData.restaurantName}"
                        </div>
                        <div className="editor__event-dates">
                            С:{" "}
                            <input
                                name="dateFrom"
                                className="editor__event-dates_input"
                                type="date"
                                onChange={(e) => setDateFrom(e.target.value)}
                            />{" "}
                            По:{" "}
                            <input
                                name="dateTo"
                                className="editor__event-dates_input"
                                type="date"
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                            {error.date ? (
                                <p className="editor__helper_text">{error.date}</p>
                            ) : null}
                        </div>
                    </>
                ) : null}
                <div className="editor__titles">
                    <div className="editor__titles_wrapper">
                        <label htmlFor="title">Заголовок:</label>
                        <input
                            className="editor__titles_field"
                            name="title"
                            type="text"
                            autoComplete="false"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {checkLength(title, maxTitleLength)}
                    </div>
                    {error.title ? <p className="editor__helper_text">{error.title}</p> : null}
                </div>

                <div className="editor__titles">
                    <div className="editor__titles_wrapper">
                        <label htmlFor="subtitle">Подзаголовок:</label>
                        <input
                            className="editor__titles_field"
                            name="subtitle"
                            type="text"
                            autoComplete="false"
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                        {checkLength(subtitle, maxSubtitleLength)}
                    </div>
                    {error.subtitle ? (
                        <p className="editor__helper_text">{error.subtitle}</p>
                    ) : null}
                </div>
                <div className="editor__titles">
                    <div className="editor__titles_wrapper align_class">
                        <label htmlFor="shortDescription">Краткое содержание:</label>
                        <textarea
                            className="editor__textfield short_description"
                            name="shortDescription"
                            onChange={handleTextareaInput}
                        />
                        {checkLength(shortDescription, maxShortDescriptionLength, "in_field")}
                    </div>
                    {error.shortDescription ? (
                        <p className="editor__helper_text">{error.shortDescription}</p>
                    ) : null}
                </div>
                <div className="editor__titles title_image">
                    <label htmlFor="short_description">Титульное изображение:</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .svg, .ico"
                        onChange={(e) => onImageUpload(e)}
                    />
                    <div className="editor__image_wrapper">
                        {titleImage ? <img src={titleImage} alt="uploaded_image" /> : null}
                    </div>
                </div>
                {displayFields}
                <button className="editor__button" onClick={handleSumbit}>
                    ОТПРАВИТЬ
                </button>
                <button className="editor__button" onClick={() => modalController(false)}>
                    ОТМЕНА
                </button>
                <button onClick={() => console.log(error)}>Check error</button>
            </div>
        </>
    );
};

export default PostConstructor;
