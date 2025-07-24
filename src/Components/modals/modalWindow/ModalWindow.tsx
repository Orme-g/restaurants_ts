import React, { EventHandler, MouseEventHandler, useEffect } from "react";

import "./modalWindow.scss";

interface IModalWindow {
    modalController: (open: boolean) => void;
    children: React.ReactNode;
}

const ModalWindow: React.FC<IModalWindow> = ({ modalController, children }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const keyHandler = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                modalController(false);
            }
        };
        document.addEventListener("keydown", keyHandler);
        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", keyHandler);
        };
    });
    function handler(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLDivElement).classList.contains("modal__window")) {
            modalController(false);
        }
    }
    return (
        <div className="modal__window" onClick={handler}>
            {children}
        </div>
    );
};

export default ModalWindow;
