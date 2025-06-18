import React, { useState } from "react";

import { useUploadRestaurantImagesMutation } from "../../services/apiSlice";

import "./workshop.scss";

const Workshop: React.FC = () => {
    const [restaurantName, setRestaurantName] = useState<string>("");
    const [files, setFiles] = useState<FileList | null>(null);
    const [sendImages, { data }] = useUploadRestaurantImagesMutation();

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!restaurantName || !files) {
            console.log("Name or files missing");
            return "";
        }
        const formData = new FormData();
        formData.append("name", restaurantName);
        Array.from(files).forEach((file) => formData.append("images", file));
        try {
            await sendImages(formData)
                .unwrap()
                .then((result) => console.log(result));
        } catch (error) {
            console.log(error);
        }

        // const response = await fetch("http://192.168.31.198:5000/upload", {
        //     method: "POST",
        //     body: formData,
        // });

        // const data = await response.json();
    };

    return (
        <div className="workshop">
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default Workshop;
