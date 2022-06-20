import React, {useState} from "react";
import {Link} from "react-router-dom";

export const LoginView = () => {
    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
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

        if (firstResp.log) {
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
    }

    return <form onSubmit={e=>handleSubmit(e)}>
        <h1>Log in</h1>
        <label htmlFor="login">
            Login
        </label>
        <input
            type="text"
            name="login"
            value={login}
            onChange={e=>setLogin(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
            type="text"
            name="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
    </form>
}