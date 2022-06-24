import React, {useContext, useState} from "react";
import "./UserView.css";
import {Link} from "react-router-dom";
import {userContext} from "../../utils/UserContext";
import {UserCard} from "../../components/UserCard/UserCard";
import {HiresUserCard} from "../../HiresUserCard/HiresUserCard";

export const UserView = () => {

    const [hires, setHires] = useState<any>(null);

    const [debt, setDebt] = useState<number>(0);

    const context = useContext(userContext);

    if (!context) return null;


    return <section className="userSection">
        <Link to="/">Go to main</Link>
        <UserCard/>
        <HiresUserCard/>
    </section>
}