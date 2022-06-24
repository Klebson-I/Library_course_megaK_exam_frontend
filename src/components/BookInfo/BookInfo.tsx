import React, {useContext, useState} from "react";
import "./BookInfo.css";
import {AuthorObject, BookObject} from "../../utils/types";
import {userContext} from "../../utils/UserContext";
import {Link} from "react-router-dom";

interface Props {
    book: BookObject | null;
    id: string;
    authors: AuthorObject[] | null;
    refreshAmountOfBook: () => Promise<void>;
}

export const BookInfo = (props: Props) => {

    const context = useContext(userContext);

    const [haveBook, setHaveBook] = useState<boolean>(false);

    if (!props.book) return null;

    const createAuthorsString = (): string => {
        if (!props.authors) return "";

        let str = "";

        str = props.authors.reduce((prev, curr) => {
            return prev + `${curr.name} ${curr.surname}, `;
        }, "");

        return str.substring(0, str.split("").length - 2);
    }

    const hireBook = async () => {

        //@TODO validate if user have already this book


        if (!context) return;

        if (!props.id || !context.userState.id) return;

        const haveBook = await fetch(`http://localhost:3001/hire/check/${context.userState.id}/${props.id}`);

        const condition = await haveBook.json();

        if (condition) {
            setHaveBook(true);
            alert("You already have this book hired ! Check your books in your user page");
            return;
        }

        const resp = await fetch("http://localhost:3001/hire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: context.userState.id,
                book_id: props.id
            })
        })

        const hire_id = await resp.json();

        await props.refreshAmountOfBook();
    }

    return <div className="bookOperationDiv__bookSecondHalf">
        <h1>{props.book.title}</h1>
        <p className="bookOperationDiv__bookSecondHalf--authors">{
            createAuthorsString()
        }</p>
        <span className="bookOperationDiv__bookSecondHalf--info">
            Genre : {props.book.genre}
        </span>
        <span className="bookOperationDiv__bookSecondHalf--info">
            Year of release : {props.book.year}
        </span>
        <span className="bookOperationDiv__bookSecondHalf--availability" style={{
            color: props.book.amount > 0 ? "green" : "red"
        }}>
            {
                props.book.amount > 0 ? "Book available" : "Out of this book"
            }
        </span>
        {
            context &&
            context.userState.id !== ""
                ?
                <button className="bookOperationDiv__bookSecondHalf--takeBookButton"
                        onClick={hireBook} disabled={props.book.amount <= 0}
                >
                    Take a book
                </button>
                :
                <Link to="/login">To take a book you must be log in</Link>
        }
    </div>
}