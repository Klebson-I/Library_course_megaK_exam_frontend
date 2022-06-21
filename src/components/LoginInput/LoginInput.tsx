import React from 'react';
import './LoginInput.css';

interface Props {
    type : string;
    name : string;
    value : string;
    handleChange :  React.Dispatch<React.SetStateAction<string>>
    labelText : string;
}

export const LoginInput = (props : Props) => {
    return <div className="inputDiv">
        <label htmlFor={props.name} className="inputDiv--label">
            {props.labelText}
        </label>
        <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={e=>props.handleChange(e.target.value)}
            className="inputDiv--input"
        />
    </div>


}