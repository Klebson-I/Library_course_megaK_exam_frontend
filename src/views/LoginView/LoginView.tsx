import React, {useState} from "react";
import {Link} from "react-router-dom";
import {LoginInput} from "../../components/LoginInput/LoginInput";
import './LoginView.css';
import {Button} from "../../components/Button/Button";
import {UserObjectLogin} from "../../utils/types";
import {useUserContext} from "../../utils/UserContext";
import {PageTop} from "../../components/PageTop/PageTop";

export const LoginView = () => {
    const [login, setLogin] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [isLog, setIsLog] = useState<boolean>(false);

    const [isFailedToLog, setIsFailedToLog] = useState<boolean>(false);

    const context = useUserContext();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isPassCorrect = await fetch('http://localhost:3001/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: login,
                password : password
            })
        })

        const firstResp : {log:boolean} = await isPassCorrect.json();

        if (firstResp.log) {
            setIsLog(true);
            const resp = await fetch('http://localhost:3001/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            })

            const userData: UserObjectLogin = await resp.json();

            logTheUser(userData);
        } else {
            setIsFailedToLog(true);
        }
    }

    const logTheUser = (obj: UserObjectLogin) => {

        const {dispatch} = context;

        dispatch({
            type: "SET_ID",
            payload: obj.id
        })

        dispatch({
            type: "SET_NAME",
            payload: obj.name
        })

        dispatch({
            type: "SET_SURNAME",
            payload: obj.surname
        })

        dispatch({
            type: "SET_ADDRESS",
            payload: obj.address
        })

        dispatch({
            type: "SET_CITY",
            payload: obj.city
        })

        dispatch({
            type: "SET_EMAIL",
            payload: obj.email
        })

        dispatch({
            type: "SET_PHONE",
            payload: Number(obj.phone)
        })

        dispatch({
            type: "SET_ADMIN",
            payload: obj.is_admin == 1
        })
    }

    const resetForm = () => {
        setIsFailedToLog(false);
        setLogin("");
        setPassword("");
    }


    return <>
        <PageTop/>
        <main>
            <form onSubmit={e => handleSubmit(e)} className="loginForm">
                <h1>Log in</h1>
                {
                    isLog
                        ?
                        <React.Fragment>
                            <h2>Login successful</h2>
                            <Link to="/">Go back to main page</Link>
                        </React.Fragment>
                        : isFailedToLog
                        ?
                        <React.Fragment>
                            <h2>Login failed</h2>
                            <Link to="/login" onClick={() => resetForm()}>Try again</Link>
                        </React.Fragment>
                        : <React.Fragment>
                            <LoginInput
                                type="text"
                                name="login"
                                value={login}
                                handleChange={setLogin}
                                labelText="Login"
                            />
                            <LoginInput
                                type="password"
                                name="password"
                                value={password}
                                handleChange={setPassword}
                                labelText="Password"
                            />
                            <Button type="submit">Login</Button>
                            <Link to="/register">Don't have an account ? Register here</Link>
                        </React.Fragment>
                }
            </form>
        </main>
    </>

}