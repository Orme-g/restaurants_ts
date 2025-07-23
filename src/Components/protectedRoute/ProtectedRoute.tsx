import React from "react";
import { useAppSelector } from "../../types/store";
import { Navigate, useLocation } from "react-router-dom";
interface IProtectedRoute {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
    const isAuth = useAppSelector((state) => state.interactive.isAuth);
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
