import React, {useContext, useState} from "react";
import "./UserView.css";
import {Link} from "react-router-dom";
import {userContext} from "../../utils/UserContext";
import {UserCard} from "../../components/UserCard/UserCard";
import {HiresUserCard} from "../../components/HiresUserCard/HiresUserCard";
import {PageTop} from "../../components/PageTop/PageTop";
import settings from "../../images/settings.png";

export const UserView = () => {

    const [debt, setDebt] = useState<number>(0);

    const context = useContext(userContext);

    return <section className="userSection">
        <div className="userSection__header">
            <PageTop/>
        </div>
        <div className="userSection__userInformation">
            <Link to="/settings"> <img src={settings} alt="" className="userSection__userInformation--img"/> </Link>
            <UserCard/>
            <HiresUserCard/>
        </div>
    </section>
}