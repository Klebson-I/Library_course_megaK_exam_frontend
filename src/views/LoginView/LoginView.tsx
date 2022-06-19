import React, {useState} from "react";

export const LoginView = () => {
    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    return <>
        <h1>Log in</h1>
        <p>You must have</p>
    </>
}