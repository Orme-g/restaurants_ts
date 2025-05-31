import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { convertToBase64 } from "../../../utils/convertToBase64";

interface IFilefield {
    type: "photo" | "slider";
    id: string;
    handleDeleteField: (id: string) => void;
    modifyRef: (id: string, value: string | string[] | null) => void;
}
const Filefield: React.FC<IFilefield> = ({ type, id, handleDeleteField, modifyRef }) => {
    const [image, setImage] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const multiple = type === "slider" ? true : false;
    const title = type === "photo" ? "Добавить Изображение:" : "Добавить Слайдер:";
    async function onImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            if (type === "photo") {
                const image = e.target.files[0];
                const base64Image = await convertToBase64(image);
                setImage([base64Image]);
                modifyRef(id, base64Image);
                document.getElementById(id)?.classList.remove("filefield_error");
            } else if (type === "slider") {
                const filesArray = Array.from(e.target.files);
                const promises = filesArray.map((item) => {
                    return convertToBase64(item);
                });
                Promise.all(promises).then((results) => {
                    if (results.length < 4) {
                        setError("Выберите минимум 4 изображения для слайдера");
                    } else {
                        setImage([...results]);
                        modifyRef(id, results);
                        setError(null);
                        document.getElementById(id)?.classList.remove("filefield_error");
                    }
                });
            }
        }
    }
    const imageDisplay = image.map((item) => {
        const _id = nanoid();
        return (
            <div className="editor__image_wrapper" key={_id}>
                <img src={item} alt="uploaded_image" />
            </div>
        );
    });
    return (
        <>
            <div className="editor__filefield">
                <div className="editor__filefield_input-wrapper">
                    <div className="editor__filefield_title">{title}</div>
                    <input
                        id={id}
                        type="file"
                        accept=".png, .jpg, .jpeg, .svg, .ico"
                        multiple={multiple}
                        onChange={(e) => onImageUpload(e)}
                    />
                    {error ? <p className="editor__helper_text">{error}</p> : null}

                    <div
                        className="editor__filefield_handle delete"
                        onClick={() => handleDeleteField(id)}
                    >
                        Удалить
                    </div>
                </div>

                <div className="editor__image-gallery">{imageDisplay}</div>
            </div>
        </>
    );
};

export default Filefield;
