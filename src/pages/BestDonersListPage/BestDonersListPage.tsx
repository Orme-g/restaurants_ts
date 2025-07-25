import React from "react";
import { Helmet } from "react-helmet-async";
import { useGetDonersListQuery } from "../../services/donersApi";
import LongCard from "../../Components/longCard/LongCard";
import { LongCardsSkeleton } from "../../Components/skeletons/Skeletons";
import ServerError from "../ServerError";

import "./bestDonersListPage.scss";

const BestDonersListPage: React.FC = () => {
    const { data: allDonersData, isLoading, isError } = useGetDonersListQuery();
    if (isLoading || !allDonersData) {
        return <LongCardsSkeleton />;
    }
    if (isError) {
        return <ServerError />;
    }
    const donersCards = allDonersData.map((doner) => {
        const { _id } = doner;
        return <LongCard type="doner" key={_id} data={doner} />;
    });
    return (
        <>
            <Helmet>
                <title>Наши обзоры на лучшую шаверму.</title>
            </Helmet>
            <div className="page_wrapper">
                <section className="best-doner__container">
                    <div className="best-doner__title">В поисках той самой...</div>
                    <div className="best-doner__about">
                        Мы - движимые мечтой. Мы ищем ту самую, лучшую шаверму. Каждое место
                        посещено нами лично, обзор написан честно и беспристрастно. Несмотря на это
                        - наше мнение всё же субъективно и мы не можем гарантировать, что
                        понравившееся нам - так же понравится и Вам. <br />
                        Но свои поиски мы продолжим, а их результаты читайте ниже.
                    </div>
                    <div className="best-doner__cards">{donersCards}</div>
                </section>
            </div>
        </>
    );
};

export default BestDonersListPage;
