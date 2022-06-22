import React, {useState} from "react";
import {LoginInput} from "../../components/LoginInput/LoginInput";
import './RegisterView.css';
import {Button} from "../../components/Button/Button";
import {validateData, validatePassword} from "../../utils/validationFunctions";
import {Link} from "react-router-dom";

export const RegisterView = () => {
    const [name,setName] = useState<string>("");
    const [surname,setSurname] = useState<string>("");
    const [city,setCity] = useState<string>("");
    const [address,setAddress] = useState<string>("");
    const [phone,setPhone] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [isRegisterTry,setIsRegisterTry] = useState<boolean>(false);
    const [isFailedToRegister,setIsFailedToRegister] = useState<boolean>(false);

    const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();


        const validationDataPass = validateData({
            name,
            surname,
            city,
            address,
            phone:Number(phone),
            email,
        });

        const validationPasswordPass = validatePassword(password);

        if (!validationDataPass && !validationPasswordPass) {
            setIsRegisterTry(true);
            const resp = await fetch('http://localhost:3001/register',{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name : name,
                    surname : surname,
                    city : city,
                    address : address,
                    phone:Number(phone),
                    email : email,
                    login : login,
                    password : password
                })
            });

            const firstResp : {regSuccess : boolean} = await resp.json();

            if (firstResp.regSuccess) {
                setIsFailedToRegister(false);
            }
            else {
                setIsFailedToRegister(true);
            }
        }
    }

    const resetForm = () => {
        setIsFailedToRegister(false);
        setIsRegisterTry(false);
    }

    return <form className="registerForm" onSubmit={(e)=>handleSubmit(e)}>
        {
            isRegisterTry
                ?
                isFailedToRegister
                    ?
                    <React.Fragment>
                        <h2>Login failed</h2>
                        <Link to="/register" onClick={()=>resetForm()}>Try again</Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h2>Register successful</h2>
                        <Link to="/login">Go to login</Link>
                    </React.Fragment>
                :
                <React.Fragment >
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
                </React.Fragment>
        }
    </form>
}