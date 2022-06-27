import {PageHeader} from "../PageHeader/PageHeader";
import {Link} from "react-router-dom";
import arrow from "../../backarrow.png";
import React from "react";
import "./PageTop.css";

export const PageTop = () => {
    return <div className="userSection__header">
        <PageHeader/>
        <div className="userSection__header__backLink">
            <Link to="/"><img src={arrow} alt="" className="userSection__header__backLink--image"/></Link>
        </div>
    </div>
}