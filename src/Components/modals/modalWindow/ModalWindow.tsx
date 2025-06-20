import React, { useEffect } from "react";

import "./modalWindow.scss";

interface IModalWindow {
    modalController: (open: boolean) => void;
    children: React.ReactNode;
}

const ModalWindow: React.FC<IModalWindow> = ({ modalController, children }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const keyHandler = (e: any) => {
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
    function handler(e: any) {
        if (e.target.classList.contains("modal__window")) {
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
