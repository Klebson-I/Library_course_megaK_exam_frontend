import React from "react";
import './PageHeader.css';
import {Link} from "react-router-dom";

export const PageHeader = () => {
    return <header>
        <h1>OPEN MIND LIBRARY</h1>
        <Link to='/library/login'><button></button></Link>
    </header>
}