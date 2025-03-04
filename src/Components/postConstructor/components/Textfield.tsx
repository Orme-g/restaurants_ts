import React, { useState } from "react";
import { Quotes } from "../../../Components/svg/Quotes";

interface ITextfield {
    type: "text" | "bloquote";
    handleDeleteField: (id: string) => void;
    id: string;
    modifyRef: (id: string, value: string) => void;
    error?: string | undefined;
}

const Textfield: React.FC<ITextfield> = ({ type, handleDeleteField, id, modifyRef, error }) => {
    const [value, setValue] = useState("");
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const mark = () => {
        switch (type) {
            case "text":
                return <div className="text_mark">Text</div>;
            case "bloquote":
                return <Quotes />;
        }
    };
    const confirmation = (
        <div className="editor__delete_confirmation">
            Данные будут утеряны. <br /> Удалять поле?
            <button className="editor__button confirmation" onClick={() => handleDeleteField(id)}>
                Да
            </button>
            <button
                className="editor__button confirmation"
                onClick={() => setDisplayConfirmation(false)}
            >
                Отмена
            </button>
        </div>
    );
    const checkAndDelete = () => {
        if (value.trim().length > 0) {
            setDisplayConfirmation(true);
        } else {
            handleDeleteField(id);
        }
    };
    function sendUpdate() {
        modifyRef(id, value);
    }
    function adjustTextarea(textarea: HTMLTextAreaElement) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        adjustTextarea(e.target);
        setValue(e.target.value);
    }

    return (
        <div className="editor__wrapper">
            <div className="editor__mark">{mark()}</div>
            <div className="editor__delete_field">
                <div className="editor__delete_mark" onClick={checkAndDelete}>
                    Удалить
                </div>
                {displayConfirmation ? confirmation : null}
            </div>

            <textarea
                id={id}
                className={`editor__textfield ${type === "bloquote" ? "bloquote" : null}`}
                data-textarea={type}
                aria-multiline
                value={value}
                onChange={handleInput}
                onBlur={sendUpdate}
            />
            {/* <div className="editor__textfield_error">Error occured</div> */}
            {error ? <div className="editor__textfield_error">{error}</div> : null}
        </div>
    );
};

export default Textfield;
