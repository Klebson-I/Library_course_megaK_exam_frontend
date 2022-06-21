import React, {ReactChildren} from "react";
import './Button.css';
type ButtonType  =
    "button"|
    "reset"|
    "submit";

interface Props {
    children : string;
    type : ButtonType;
}

export const Button = (props:Props) => {
    return <button
        type={props.type}
        className="Button"
    >
        {props.children}
    </button>
}