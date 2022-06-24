import React, {useContext, useState} from "react";
import "./UserView.css";
import {Link} from "react-router-dom";
import {userContext} from "../../utils/UserContext";
import {UserCard} from "../../components/UserCard/UserCard";
import {HiresUserCard} from "../../HiresUserCard/HiresUserCard";
import {PageHeader} from "../../components/PageHeader/PageHeader";
import arrow from "../../backarrow.png";

export const UserView = () => {

    const [debt, setDebt] = useState<number>(0);

    const context = useContext(userContext);

    return <section className="userSection">
        <div className="userSection__header">
            <PageHeader/>
            <div className="userSection__header__backLink">
                <Link to="/"><img src={arrow} alt="" className="userSection__header__backLink--image"/></Link>
            </div>
        </div>
        <div className="userSection__userInformation">
            <UserCard/>
            <HiresUserCard/>
        </div>
    </section>
}