import React, { useState } from "react";

import { TextField, Button } from "@mui/material";

import { useUpdateBlogerDataSingleFieldMutation } from "../../../services/apiSlice";

import { useParams } from "react-router-dom";

interface IEditSingleField {
    value: string;
    field: "aboutMe" | "blogCity";
    displayHandler: (field: "aboutMe" | "blogCity") => void;
}

const EditSingleField: React.FC<IEditSingleField> = ({ field, value, displayHandler }) => {
    const [fieldValue, setFieldValue] = useState(() => {
        return value;
    });
    const [helperText, setHelperText] = useState<string | null>(null);
    const [sendData] = useUpdateBlogerDataSingleFieldMutation();
    const { userId } = useParams();

    const lettersLeft = 300 - fieldValue.length;
    const handleInput: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setFieldValue(e.target.value);
    };
    const handleSubmit = () => {
        if (lettersLeft < 0) {
            setHelperText("Не больше 300 символов");
            return;
        }
        if (lettersLeft >= 0) {
            sendData({
                userId,
                field,
                data: fieldValue,
            })
                .unwrap()
                .then((response) => {
                    console.log(response);
                    displayHandler(field);
                    setFieldValue("");
                    setHelperText(null);
                })
                .catch((error) => console.log(error));
        }
    };
    return (
        <>
            <div className="limited-length_field">
                <TextField
                    onChange={(e) => handleInput(e)}
                    defaultValue={fieldValue}
                    multiline
                    style={{ width: 600, marginBottom: "10px" }}
                />
                {field === "blogCity" ? null : (
                    <div className="letters-count single-field">{lettersLeft}/300</div>
                )}
                {/* <div className="letters-count single-field">{lettersLeft}/300</div> */}
            </div>
            {field === "blogCity" ? null : (
                <div className="limited-length_field_helper-text">{helperText}</div>
            )}
            {/* <div className="limited-length_field_helper-text">{helperText}</div> */}
            <Button onClick={handleSubmit} variant="contained">
                Отправить
            </Button>
        </>
    );
};

export default EditSingleField;
