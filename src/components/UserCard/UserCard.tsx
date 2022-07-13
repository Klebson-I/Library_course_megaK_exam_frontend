import React, {useState} from "react";
import "./UserCard.css";
import {useUserContext} from "../../utils/UserContext";
import image from "../../images/user2.png";
import {TokenObject} from "../../utils/types";


export const UserCard = () => {
    const context = useUserContext();
    const [token, setToken] = useState<TokenObject | null>(null);

    const createToken = async (): Promise<void> => {
        const resp = await fetch("http://localhost:3001/token");
        const passes = await resp.json() as TokenObject | null;
        setToken(passes);
    }

    return <section className="userCard">
        <div className="userCard__imageDiv">
            <img src={image} alt="" className="userCard__imageDiv--img"/>
        </div>
        <div className="userCard__userData">
            <span>{`Name and surname : ${context.userState.name} ${context.userState.surname}`}</span>
            <span>{`Address : ${context.userState.city}, ${context.userState.address}`}</span>
            <span>{`Phone number : ${context.userState.phone}`}</span>
            <span>{`Email : ${context.userState.email}`}</span>
            {
                context && context.userState.is_admin
                    ? <button className="userCard__userData--createTokenButton" onClick={createToken}>
                        Create admin token</button>
                    : null
            }

            {
                token && <div className="userCard__userData--tokenDiv">
                    <table>
                        <thead>
                        <tr>
                            <td>TOKEN ID</td>
                            <td>LOGIN</td>
                            <td>PASSWORD</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{token.id}</td>
                            <td>{token.login}</td>
                            <td>{token.password}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    </section>
}


//<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>