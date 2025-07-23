import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../types/store";

interface IRedirectRoute {
    children: JSX.Element;
}
const RedirectRoute: React.FC<IRedirectRoute> = ({ children }) => {
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    if (isAuth) {
        return <Navigate to="/profile" replace />;
    }
    return children;
};

export default RedirectRoute;
