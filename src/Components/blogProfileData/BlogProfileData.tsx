import React, { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./blogProfileData.scss";

import { calculateStatus } from "../../utils/calculateExperience";
import EditSingleField from "../forms/editSingleField/EditSingleField";

import ModalWindow from "../modals/modalWindow/ModalWindow";
import PostConstructor from "../postConstructor/PostConstructor";

import type { IBlogData } from "../../types/userData";

interface IBlogProfileData {
    blogData: IBlogData;
}

const BlogProfileData: React.FC<IBlogProfileData> = ({ blogData }) => {
    const [editAboutField, setEditAboutField] = useState(false);
    const [editCityField, setEditCityField] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const { blogerName, aboutMe, blogCity, blogPostsCount, blogerRating, blogAvatar } = blogData;
    const status = calculateStatus(blogerRating);

    const handleEditField = (field: "aboutMe" | "blogCity") => {
        switch (field) {
            case "aboutMe":
                setEditAboutField((editAboutField) => !editAboutField);
                break;
            case "blogCity":
                setEditCityField((editCityField) => !editCityField);
                break;
        }
    };
    const handleModal = (state: boolean) => {
        setDisplayModal(state);
    };
    return (
        <>
            <div className="profile-page__blog-subtitle">Вы ведёте блог</div>
            <div className="profile-page__userdata_item">
                <img src={blogAvatar} alt="blogAvatar" />
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">В блоге вас знают как:</div>
                <div className="profile-page__data-value">{blogerName}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Что вы написали о себе:</div>
                <div className="profile-page__data-value editable-field">
                    {editAboutField ? (
                        <EditSingleField
                            field={"aboutMe"}
                            value={aboutMe}
                            displayHandler={handleEditField}
                        />
                    ) : (
                        aboutMe
                    )}
                    <Button
                        size="medium"
                        variant="text"
                        onClick={() => handleEditField("aboutMe")}
                        className="edit-button"
                        style={{ marginLeft: "10px" }}
                    >
                        {editAboutField ? "Отмена" : null}
                        <EditIcon className="edit-button_icon" />
                    </Button>
                </div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Город:</div>
                <div className="profile-page__data-value editable-field">
                    {editCityField ? (
                        <EditSingleField
                            field={"blogCity"}
                            value={blogCity}
                            displayHandler={handleEditField}
                        />
                    ) : (
                        blogCity
                    )}

                    <Button
                        size="medium"
                        variant="text"
                        onClick={() => handleEditField("blogCity")}
                        className="edit-button"
                        style={{ marginLeft: "10px" }}
                    >
                        {editCityField ? "Отмена" : null}
                        <EditIcon className="edit-button_icon" />
                    </Button>
                    {/* {blogCity} */}
                </div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Всего постов:</div>
                <div className="profile-page__data-value">{blogPostsCount}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Ваш рейтинг:</div>
                <div className="profile-page__data-value">{blogerRating}</div>
            </div>
            <div className="profile-page__userdata_item">
                <div className="profile-page__data-field">Ваш статус:</div>
                <div className="profile-page__data-value">{status}</div>
            </div>
            <button className="profile-page__add-blog-post" onClick={() => handleModal(true)}>
                Создать пост
            </button>
            {displayModal ? (
                <ModalWindow modalController={handleModal}>
                    <PostConstructor modalController={handleModal} type="blog" />
                </ModalWindow>
            ) : null}
        </>
    );
};

export default BlogProfileData;
