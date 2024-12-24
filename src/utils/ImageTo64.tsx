import React, { useState } from "react";

import { convertToBase64 } from "./convertToBase64";

const ImageTo64: React.FC = () => {
    const [name, setName] = useState("");
    async function convertImage(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            setName(file.name);
            const base64 = await convertToBase64(file);
            console.log(base64);
        }
    }
    return (
        <div>
            <input onChange={(e) => convertImage(e)} type="file" />
            {name}
        </div>
    );
};

export default ImageTo64;
