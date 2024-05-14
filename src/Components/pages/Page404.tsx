import React from "react";
import error404 from "../../assets/error404.png";

const Page404: React.FC = () => {
    return (
        <img
            style={{ display: "block", width: "500px", margin: "0 auto", marginTop: "100px" }}
            src={error404}
            alt="error"
        />
    );
};

export default Page404;
