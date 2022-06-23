import {UserObject} from "./types";

export function validateData({
                                 name,
                                 surname,
                                 city,
                                 address,
                                 phone,
                                 email
                             }: Omit<UserObject, 'password' | 'login' | 'id'>): boolean {
    let isError = false;
    if (name.length < 2 || name.length > 50) {
        isError = true;
        alert('Name should has 2 - 50 characters');
    }
    if (surname.length < 2 || surname.length > 50) {
        isError = true;
        alert('Surname should has 2 - 50 characters');
    }
    if (city.length < 2 || city.length > 50) {
        isError = true;
        alert('City should has 2 - 50 characters');
    }
    if (address.length < 1 || address.length > 100) {
        isError = true;
        alert('Address should has 1 - 100 characters');
    }
    if (phone.toString().length !== 9) {
        isError = true;
        alert('Phone number should has 9 signs');
    }
    if (email.length < 6 || email.length > 60 || !email.split("").includes('@')) {
        isError = true;
        alert('Email should has 6 - 60 characters and have @ sign');
    }
    return isError;
}

export function validatePassword(password: string): boolean {
    let isError = false;

    const arrOfSpecialSigns = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const arrFromPassword = password.split("");

    let specialFound = arrFromPassword.some(sign => arrOfSpecialSigns.includes(sign));

    let numberFound = arrFromPassword.some(sign => !Number.isNaN(sign));

    if (password.length < 8 || password.length > 50 || !specialFound || !numberFound) {
        isError = true;
        alert('Password should consists of 8 - 50 characters, has at least one number and special sign');
    }
    return isError;
}