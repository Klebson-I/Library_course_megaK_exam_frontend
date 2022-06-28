import {PageHeader} from "../PageHeader/PageHeader";
import {Link} from "react-router-dom";
import home from "../../images/home.png";
import user from "../../images/user.png";
import React, {useContext} from "react";
import "./PageTop.css";
import {userContext} from "../../utils/UserContext";
import enter from "../../images/enter.png";

export const PageTop = () => {

    const context = useContext(userContext);

    const logOut = () => {
        if (!context) return;
        const {dispatch} = context;
        dispatch({
            type: "RESET"
        })
    }

    return <div className="userSection__header">
        <Link to="/">
            <button onClick={logOut} className="logOutButton"><img src={enter} alt="" className="logOutButton--img"/>
            </button>
        </Link>

        <PageHeader/>
        <nav>
            <Link to="/" className="userSection__header__backLink">
                <img src={home} alt="" className="userSection__header__backLink--image"/>
                <span>Main page</span>
            </Link>

            <Link to="/login" className="userSection__header__backLink">
                <img src={user} alt="" className="userSection__header__backLink--image"/>
                <span>User section</span>
            </Link>
        </nav>
    </div>
}

// <a href="https://www.flaticon.com/free-icons/home" title="home icons">Home icons created by hqrloveq - Flaticon</a>