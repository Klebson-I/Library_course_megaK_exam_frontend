import React, {useState} from "react";
import './AddBookView.css';
import {PageTop} from "../../components/PageTop/PageTop";
import {useUserContext} from "../../utils/UserContext";
import {BookGenre, BookObjectAdd} from "../../utils/types";

const genresArray = ['sci-fi', 'novel', 'drama', 'comedy',
    'historical', 'science', 'gangster novel', 'absurdist', 'fantasy',
    'adventure', 'criminal', 'horror', 'thriller', 'comics', 'philosophy'];

export const AddBookView = () => {

    const context = useUserContext();

    const [book, setBook] = useState<BookObjectAdd>({
        amount: 0,
        year: 0,
        title: "",
        genre: "drama",
        authors: []
    })

    const [authorsInputs, setAuthorsInputs] = useState<string[]>(["1"]);

    const addAuthorInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const prevNum = authorsInputs[authorsInputs.length - 1];
        const nextNum = Number(prevNum) + 1;
        setAuthorsInputs(prev => [
            ...prev,
            nextNum.toString()
        ])
    }

    const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.name.substring(0, 7) === 'authors') {
            const index = e.target.name.split("")[e.target.name.length - 1];
            console.log(index);
            setBook(prev => ({
                ...prev,
                authors: []
            }))
        }

        setBook(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        setBook(prev => ({
            ...prev,
            genre: e.target.value as BookGenre
        }))
    }

    const submitForm = () => {

    }

    return <main className="addBookContainer">
        {
            //@TODO add styles to inputs and to labels
            context.userState.is_admin ?
                <>
                    <PageTop/>
                    <form action="" className="addBookContainer__form" onSubmit={submitForm}>
                        <label htmlFor="" className="addBookContainer__form--label">
                            Title
                            <input
                                type="text"
                                className="settingsInput"
                                name="title"
                                onChange={changeForm}
                            />
                        </label>

                        <label htmlFor="" className="addBookContainer__form--label">
                            Genre
                            <select name="genre" id="" value={book.genre as BookGenre} onChange={changeSelect}>
                                {
                                    genresArray.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))
                                }
                            </select>
                        </label>

                        <label htmlFor="" className="addBookContainer__form--label">
                            Year of release
                            <input type="number"
                                   className="settingsInput"
                                   name="number"
                                   onChange={changeForm}/>
                        </label>

                        <label htmlFor="" className="addBookContainer__form--authorInput">
                            Authors
                            {
                                authorsInputs.map(elem => (
                                    <input type="text"
                                           className="settingsInput"
                                           name={`authors-${authorsInputs.length - 1}`}
                                           onChange={changeForm} key={elem}/>
                                ))
                            }
                            <button onClick={e => addAuthorInput(e)}>+</button>
                        </label>

                        <label htmlFor="" className="addBookContainer__form--label">
                            Quantity
                            <input type="number"
                                   className="settingsInput"
                                   name="amount"
                                   onChange={changeForm}/>
                        </label>

                        <button type={"submit"}>
                            Add book to database
                        </button>
                    </form>
                </>
                : <>
                    You have no permission to access this page
                </>
        }
    </main>
}