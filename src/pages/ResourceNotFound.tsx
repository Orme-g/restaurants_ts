import React from "react";
import resourceNotFound from "../assets/Resource_not_found.svg";

interface IResourceNotFound {
    // height?: number;
}
const ResourceNotFound: React.FC<IResourceNotFound> = () => {
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center" }}>
            <img
                style={{
                    display: "block",
                    margin: "0 auto",
                    paddingTop: "70px",
                    height: "100vh",
                    width: "600px",
                    maxWidth: "90%",
                    objectFit: "contain",
                }}
                src={resourceNotFound}
                alt="Resource not found"
            ></img>
        </div>
    );
};

export default ResourceNotFound;
