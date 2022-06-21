import React, {useState} from "react";
import {Link} from "react-router-dom";
import {LoginInput} from "../../components/LoginInput/LoginInput";
import './LoginView.css';
import {Button} from "../../components/Button/Button";

export const LoginView = () => {
    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [isLog,setIsLog] = useState<boolean>(false);
    const [isFailedToLog,setIsFailedToLog] = useState<boolean>(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        console.log("SUBMIT");
        e.preventDefault();
        const isPassCorrect = await fetch('http://localhost:3001/login',{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                login : login,
                password : password
            })
        })

        const firstResp : {log:boolean} = await isPassCorrect.json();

        console.log(firstResp);

        if (firstResp.log) {
            setIsLog(true);
            const resp = await fetch('http://localhost:3001/user',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    login : login,
                    password : password
                })
            })
            const userData = await resp.json();
            console.log(userData);
        }
        else {
            setIsFailedToLog(true);
        }
    }

    const resetForm = () => {
        setIsFailedToLog(false);
        setLogin("");
        setPassword("");
    }


    return <form onSubmit={e=>handleSubmit(e)} className="loginForm">
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
                    <Link to="/login" onClick={()=>resetForm()}>Try again</Link>
                </React.Fragment>
                :<React.Fragment>
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
}