import React from "react";
import BestDonerCards from "../../bestDonerCard/BestDonerCards";

import "./bestDoner.sass";

const BestDoner: React.FC = () => {
    return (
        <section className="best-doner__container">
            <div className="best-doner__title">
                В поисках той самой ...
                <div className="best-doner__about">
                    Мы - движимые мечтой. Мы ищем ту самую, лучшую шаверму. Каждое место посещено
                    нами лично, обзор написан честно и беспристрастно. Несмотря на это - наше мнение
                    всё же субъективно и мы не можем гарантировать, что понравившееся нам - так же
                    понравится и Вам. <br />
                    Но свои поиски мы продолжим, а их результаты читайте ниже.
                </div>
            </div>
            <BestDonerCards />
        </section>
    );
};

export default BestDoner;
