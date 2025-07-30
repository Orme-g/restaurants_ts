import React from "react";
import error404 from "../assets/error404.png";

const Page404: React.FC = () => {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
            <img
                style={{
                    display: "block",
                    width: "500px",
                    maxWidth: "90%",
                    margin: "0 auto",
                    objectFit: "contain",
                }}
                src={error404}
                alt="error"
            />
        </div>
    );
};

export default Page404;
