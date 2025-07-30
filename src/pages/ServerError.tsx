import React from "react";
import serverError from "../assets/server_error.png";

const ServerError = () => {
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
                src={serverError}
                alt="error"
            />
        </div>
    );
};

export default ServerError;
