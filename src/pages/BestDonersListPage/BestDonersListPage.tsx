import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import BestDonerCards from "../../Components/bestDonerCards/BestDonerCards";

import "./bestDonersListPage.scss";

const BestDonersListPage: React.FC = () => {
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
                    <div className="best-doner__cards">
                        <BestDonerCards />
                    </div>
                </section>
            </div>
        </>
    );
};

export default BestDonersListPage;
