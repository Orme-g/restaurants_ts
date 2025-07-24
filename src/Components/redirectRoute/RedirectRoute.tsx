import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../types/store";

interface IRedirectRoute {
    children: JSX.Element;
}
const RedirectRoute: React.FC<IRedirectRoute> = ({ children }) => {
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    if (isAuth === null) {
        return null;
    }
    if (isAuth) {
        return <Navigate to="/profile" replace />;
    }
    return children;
};

export default RedirectRoute;
