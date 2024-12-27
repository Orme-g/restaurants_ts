import React, { useState, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Textfield from "./components/Textfield";
import Filefield from "./components/Filefield";
import { convertToBase64 } from "../../utils/convertToBase64";

import "./workshop.sass";

type InputType = "text" | "bloquote" | "photo" | "slider";
interface IFieldData {
    type: InputType;
    id: string;
    value: string | string[] | null;
}
const Workshop: React.FC = () => {
    const [fields, setFields] = useState<IFieldData[] | []>([]);
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [titleImage, setTitleImage] = useState<string | null>(null);
    // const [error, setError] = useState(false);
    let refData = useRef<IFieldData[]>([]);

    const buttons: InputType[] = ["text", "bloquote", "photo", "slider"];
    const displayButtons = buttons.map((item) => {
        return (
            <button key={item} className="editor__button" onClick={() => buttonHandler(item)}>
                {item.toUpperCase()}
            </button>
        );
    });

    function addFieldToRef(data: IFieldData) {
        const { type, id } = data;
        refData.current = [...refData.current, { type, id, value: "" }];
    }
    function deleteFieldFromRef(id: string) {
        refData.current = [...refData.current.filter((item) => item.id !== id)];
    }

    function modifyRef(id: string, value: string | string[]) {
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
            const { type, id } = item;
            if (type === "bloquote" || type === "text") {
                return (
                    <Textfield
                        key={id}
                        type={type}
                        id={id}
                        handleDeleteField={handleDeleteField}
                        modifyRef={modifyRef}
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
    function checkLength(value: string, allowed: number, ...extraClasses: string[]) {
        const classes = extraClasses.join(" ");
        const show_error = value.length > allowed ? "show_error" : "";
        return (
            <div className={`characters_left ${show_error} ${classes}`}>
                {value.length}/{allowed}
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

    const handleSumbit = () => {
        const content = refData.current.map((item) => {
            const { type, value } = item;
            return { [type]: value };
        });
        let dataToSend: any = {
            title: title.trim(),
            title_image: titleImage,
            subtitle: subtitle.trim(),
            short_description: shortDescription.trim(),
            content,
        };

        console.log(dataToSend);
    };
    return (
        <>
            <div className="workshop__container">
                <div className="editor__instruments">{displayButtons}</div>
                <div className="editor__titles">
                    <label htmlFor="title">Заголовок:</label>
                    <input
                        className="editor__titles_field"
                        name="title"
                        type="text"
                        autoComplete="false"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {checkLength(title, 50)}
                </div>
                <div className="editor__titles">
                    <label htmlFor="subtitle">Подзаголовок:</label>
                    <input
                        className="editor__titles_field"
                        name="subtitle"
                        type="text"
                        autoComplete="false"
                        onChange={(e) => setSubtitle(e.target.value)}
                    />
                    {checkLength(subtitle, 100)}
                </div>
                <div className="editor__titles">
                    <label htmlFor="short_description">Краткое содержание:</label>
                    <textarea
                        className="editor__textfield short_description"
                        name="short_description"
                        onChange={handleTextareaInput}
                    />
                    {checkLength(shortDescription, 200, "in_field")}
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
                <button onClick={() => console.log(refData.current)}>Check Ref</button>
            </div>
        </>
    );
};

export default Workshop;
