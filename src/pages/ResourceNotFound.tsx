import React from "react";
import resourceNotFound from "../assets/Resource_not_found.svg";

interface IResourceNotFound {
    height?: number;
}
const ResourceNotFound: React.FC<IResourceNotFound> = ({ height }) => {
    return (
        <img
            style={{
                display: "block",
                margin: "150px auto 100px auto",
                height: `${height || 500}px`,
            }}
            src={resourceNotFound}
            alt="Resource not found"
        ></img>
    );
};

export default ResourceNotFound;
