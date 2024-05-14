import React from "react";
import serverError from "../../assets/server_error.png";

const ServerError = () => {
    return (
        <img
            style={{ display: "block", width: "500px", margin: "0 auto", marginTop: "100px" }}
            src={serverError}
            alt="error"
        />
    );
};

export default ServerError;
