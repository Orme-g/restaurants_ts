import React, { useState, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Textfield from "./components/Textfield";
import Filefield from "./components/Filefield";

import "./workshop.sass";

type InputType = "text" | "bloquote" | "photo" | "slider";
interface IFieldData {
    type: InputType;
    id: string;
    value: string | string[] | null;
}
const Workshop: React.FC = () => {
    const [fields, setFields] = useState<IFieldData[] | []>([]);
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

    const handleSumbit = () => {
        const dataToSend = refData.current.map((item) => {
            const { type, value } = item;
            return { [type]: value };
        });
        console.log(dataToSend);
    };
    function handleDeleteField(id: string) {
        setFields((fields) => [...fields.filter((item) => item.id !== id)]);
        deleteFieldFromRef(id);
    }
    return (
        <>
            <div className="workshop__container">
                <div className="editor__instruments">{displayButtons}</div>
                <div className="editor__titles">
                    <label htmlFor="title">Заголовок:</label>
                    <input className="editor__titles_field" name="title" />
                </div>
                <div className="editor__titles">
                    <label htmlFor="subtitle">Подзаголовок:</label>
                    <input className="editor__titles_field" name="subtitle" />
                </div>
                <div className="editor__titles">
                    <label htmlFor="short_description">Краткое содержание:</label>
                    <input className="editor__titles_field" name="short_description" />
                </div>
                <div className="editor__titles title_image">
                    <label htmlFor="short_description">Титульное изображение:</label>
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg, .svg, .ico"
                        // multiple={multiple}
                        // onChange={(e) => onImageUpload(e)}
                    />
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
