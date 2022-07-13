import React, {useContext, useState} from "react";
import {PageTop} from "../../components/PageTop/PageTop";
import {userContext} from "../../utils/UserContext";
import "./SettingsView.css";
import {SingleFieldValidateInterface, validateSingleField} from "../../utils/validationFunctions";
import {UpdateResponse, UserInfo} from "../../utils/types";


export const SettingsView = () => {

    const context = useContext(userContext);

    const [information, setInformation] = useState<UserInfo>({
        email: context ? context.userState.email !== "" ? context.userState.email : "" : "",
        phone: context ? context.userState.phone ? context.userState.phone : 0 : 0,
        login: "",
        password: "",
        confirmPassword: ""
    });

    const [oldPasses, setOldPasses] = useState<Pick<UserInfo, 'login' | 'password'>>({
        login: "",
        password: ""
    })

    const [isChangeClick, setIsChangeClick] = useState<boolean>(false);

    const [updateProperty, setUpdateProperty] = useState<null | Partial<Record<keyof UserInfo, any>>>(null);

    const [passwordsNotEqualAlert, setPasswordsNotEqualAlert] = useState<boolean>(false);

    const [isUpdate, setIsUpdate] = useState<null | true | string>(null);

    const [isValidationBad, setIsValidationBad] = useState<true | null>(null);

    const updateInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setInformation(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const changeUpdateObject = (propertyName: keyof SingleFieldValidateInterface) => {

        const isValid = validateSingleField({
            [propertyName]: information[propertyName]
        });

        if (!isValid) {
            setIsValidationBad(true);
            return;
        }

        if (propertyName === "password") {
            const isEqual = checkIfPasswordsEqual();
            if (!isEqual) {
                setPasswordsNotEqualAlert(true);
                return;
            }
        }

        setUpdateProperty({
            [propertyName]: information[propertyName]
        })

        setIsChangeClick(true);
    }

    const checkIfPasswordsEqual = (): boolean => {
        if (information.password !== information.confirmPassword) {
            setPasswordsNotEqualAlert(true);
            return false;
        }
        return true;
    }


    const confirmUpdate = async (): Promise<void> => {
        setIsChangeClick(false);

        if (!updateProperty) {
            return;
        }

        if (oldPasses.password === "" || oldPasses.login === "") {
            alert("Fields cannot be empty");
            return;
        }

        const isPropertyInvalid = validateSingleField(updateProperty);

        if (!isPropertyInvalid) {

            //when we don't change login or password the fields will still have old before property name
            const updateObject = {
                oldLogin: oldPasses.login,
                oldPassword: oldPasses.password,
                ...updateProperty
            }

            console.log(updateProperty);

            const resp = await fetch('http://localhost:3001/user', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateObject)
            })
            const response = await resp.json();

            handleResponseFromUpdate(response);
        }
    }

    const handleResponseFromUpdate = (response: UpdateResponse) => {
        setIsUpdate(response);
        setOldPasses({
            login: "",
            password: ""
        })
    }

    const changeOldPasses = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setOldPasses(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return <>
        <PageTop/>
        <main className="settingsMain"
              style={{
                  filter: passwordsNotEqualAlert || isChangeClick || isUpdate || isValidationBad ? "blur(10px)" : "none"
              }}>
            <section>
                <h2>Change login</h2>
                <input
                    type="text"
                    value={information.login}
                    onChange={updateInformation}
                    name="login"
                    className="settingsInput"
                />
                <button onClick={() => changeUpdateObject("login")}>CHANGE</button>
            </section>
            <section>
                <h3>Change email</h3>
                <input
                    type="email"
                    value={information.email}
                    onChange={updateInformation}
                    name="email"
                    className="settingsInput"

                />
                <button onClick={() => changeUpdateObject("email")}>CHANGE</button>
            </section>
            <section>
                <h4>Change phone number</h4>
                <input
                    type="number"
                    value={information.phone}
                    onChange={updateInformation}
                    name="phone"
                    className="settingsInput"
                />
                <button onClick={() => changeUpdateObject("phone")}>CHANGE</button>
            </section>

            <section>
                <h5>Change password</h5>

                <label htmlFor="">
                    New password
                    <input
                        type="text"
                        value={information.password}
                        onChange={updateInformation}
                        name="password"
                        className="settingsInput"
                    />
                </label>
                <label>
                    Confirm new password
                    <input
                        type="text"
                        value={information.confirmPassword}
                        onChange={updateInformation}
                        name="confirmPassword"
                        className="settingsInput"
                    />
                </label>
                <button onClick={() => changeUpdateObject("password")}>CHANGE</button>
            </section>
        </main>
        {
            passwordsNotEqualAlert &&
            <section className="alertSection">
                <span className="alertSection--infoSpan">Passwords must be the same</span>
                <button onClick={() => setPasswordsNotEqualAlert(false)} className="alertSection--button">OK</button>
            </section>
        }
        {
            isChangeClick &&
            <section className="alertSection">
                <span className="alertSection--infoSpan">Confirm by typing login and password</span>
                <label htmlFor="">
                    Login
                    <input
                        type="text"
                        className="alertSection--input"
                        value={oldPasses.login}
                        name="login"
                        onChange={changeOldPasses}
                    />
                </label>
                <label htmlFor="">
                    Password
                    <input
                        type="password"
                        className="alertSection--input"
                        value={oldPasses.password}
                        name="password"
                        onChange={changeOldPasses}
                    />
                </label>
                <button onClick={() => confirmUpdate()} className="alertSection--button">Confirm</button>
            </section>
        }
        {
            isUpdate &&
            <section className="alertSection">
                <span className="alertSection--infoSpan">{isUpdate}</span>
                <button onClick={() => setIsUpdate(null)} className="alertSection--button">OK</button>
            </section>
        }
        {
            isValidationBad &&
            <section className="alertSection">
                <span className="alertSection--infoSpan">Changing data is not valid</span>
                <button onClick={() => setIsValidationBad(null)} className="alertSection--button">OK</button>
            </section>
        }
    </>
}