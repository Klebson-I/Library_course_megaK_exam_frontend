import {PageHeader} from "../PageHeader/PageHeader";
import {Link} from "react-router-dom";
import arrow from "../../backarrow.png";
import user from "../../user.png";
import React from "react";
import "./PageTop.css";

export const PageTop = () => {
    return <div className="userSection__header">
        <PageHeader/>
        <nav>
            <Link to="/" className="userSection__header__backLink">
                <img src={arrow} alt="" className="userSection__header__backLink--image"/>
                <span>Main page</span>
            </Link>

            <Link to="/login" className="userSection__header__backLink">
                <img src={user} alt="" className="userSection__header__backLink--image"/>
                <span>User section</span>
            </Link>
        </nav>
    </div>
}