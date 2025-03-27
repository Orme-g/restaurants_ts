import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import BestDonerCards from "../../Components/bestDonerCards/BestDonerCards";

import ModalWindow from "../../Components/modals/modalWindow/ModalWindow";
import PostConstructor from "../../Components/postConstructor/PostConstructor";

import "./bestDonersListPage.sass";

const BestDonersListPage: React.FC = () => {
    const [displayModal, setDisplayModal] = useState(false);
    function modalOpen(open: boolean) {
        setDisplayModal(open);
    }
    return (
        <>
            <Helmet>
                <title>Наши обзоры на лучшую шаверму.</title>
            </Helmet>
            <div className="page_wrapper">
                <section className="best-doner__container">
                    <div className="best-doner__title">В поисках той самой ...</div>
                    <div className="best-doner__about">
                        Мы - движимые мечтой. Мы ищем ту самую, лучшую шаверму. Каждое место
                        посещено нами лично, обзор написан честно и беспристрастно. Несмотря на это
                        - наше мнение всё же субъективно и мы не можем гарантировать, что
                        понравившееся нам - так же понравится и Вам. <br />
                        Но свои поиски мы продолжим, а их результаты читайте ниже.
                    </div>
                    <button className="best-doner__add-topic_btn" onClick={() => modalOpen(true)}>
                        Добавить статью
                    </button>
                    <div className="best-doner__cards">
                        <BestDonerCards />
                    </div>
                </section>

                {displayModal ? (
                    <ModalWindow modalController={modalOpen}>
                        <PostConstructor type="doner" modalController={modalOpen} />
                    </ModalWindow>
                ) : null}
            </div>
        </>
    );
};

export default BestDonersListPage;
