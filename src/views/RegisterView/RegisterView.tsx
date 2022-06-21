import React, {useState} from "react";
import {LoginInput} from "../../components/LoginInput/LoginInput";
import './RegisterView.css';
import {Button} from "../../components/Button/Button";
import {validateData, validatePassword} from "../../utils/validationFunctions";

export const RegisterView = () => {
    const [name,setName] = useState<string>("");
    const [surname,setSurname] = useState<string>("");
    const [city,setCity] = useState<string>("");
    const [address,setAddress] = useState<string>("");
    const [phone,setPhone] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    const handleSubmit = () => {
        const validationDataPass = validateData({
            name,
            surname,
            city,
            address,
            phone:Number(phone),
            email,
            login
        })
        const validationPasswordPass = validatePassword(password);

        if (validationDataPass && validationPasswordPass) {

        }
    }

    return <form className="registerForm" onSubmit={()=>handleSubmit()}>
        <h1>Register now</h1>
        <LoginInput type="text" name="name" value={name} handleChange={setName} labelText="Name"/>
        <LoginInput type="text" name="surname" value={surname} handleChange={setSurname} labelText="Surname"/>
        <LoginInput type="text" name="city" value={city} handleChange={setCity} labelText="City"/>
        <LoginInput type="text" name="address" value={address} handleChange={setAddress} labelText="Address"/>
        <LoginInput type="number" name="phone" value={phone} handleChange={setPhone} labelText="Phone"/>
        <LoginInput type="email" name="email" value={email} handleChange={setEmail} labelText="Email"/>
        <LoginInput type="text" name="login" value={login} handleChange={setLogin} labelText="Login"/>
        <LoginInput type="password" name="password" value={password} handleChange={setPassword} labelText="Password"/>
        <Button type="submit">Submit registration</Button>
    </form>
}