import React from "react";

import { useParams } from "react-router-dom";

import { useGetUserDataQuery } from "../../services/apiSlice";
import { PageSkeleton } from "../../Components/skeletons/Skeletons";
import ServerError from "../ServerError";

import UserDataSection from "../../Components/userDataSection/UserDataSection";
import BlogDataSection from "../../Components/blogDataSection/BlogDataSection";

import "./profilePage.scss";

const ProfilePage: React.FC = () => {
    const { userId } = useParams<string>();
    const {
        data: userData,
        isLoading,
        isError,
    } = useGetUserDataQuery(userId as string, {
        skip: !!!userId,
    });
    if (isError) {
        return <ServerError />;
    }
    if (isLoading || !userData) {
        return <PageSkeleton />;
    }
    return (
        <div className="profile-page">
            <h1 className="profile-page__title">Просмотр профиля</h1>
            <UserDataSection userData={userData} />
            <BlogDataSection userData={userData} />
        </div>
    );
};

export default ProfilePage;
