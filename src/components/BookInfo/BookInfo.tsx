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
    setIsBlur: React.Dispatch<React.SetStateAction<boolean>>
}

export const BookInfo = (props: Props) => {

    const context = useContext(userContext);

    const [hireClick, setHireClick] = useState<boolean>(false);

    const [isHired, setIsHired] = useState<boolean>(false);

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

        setHireClick(false);

        props.setIsBlur(false);

        if (!context) return;

        if (!props.id || !context.userState.id) return;

        const haveBook = await fetch(`http://localhost:3001/hire/check/${context.userState.id}/${props.id}`);

        const condition = await haveBook.json();

        if (condition) {
            setHaveBook(true);
            props.setIsBlur(true);
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

        if (hire_id) {
            await props.refreshAmountOfBook();
            setIsHired(true);
            props.setIsBlur(true);
        }
    }

    const hireBookFirstButtonClick = (): void => {
        setHireClick(true);
        props.setIsBlur(true);
    }

    const doNotConfirm = (): void => {
        setHireClick(false);
        props.setIsBlur(false);
    }

    const accept = (): void => {
        setHireClick(false);
        props.setIsBlur(false);
        setIsHired(false);
        setHaveBook(false);
    }

    return <>
        <div className="bookOperationDiv__bookSecondHalf"
             style={{
                 filter: hireClick || isHired || haveBook ? "blur(10px)" : "none"
             }}
        >
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
                            onClick={hireBookFirstButtonClick} disabled={props.book.amount <= 0}
                    >
                        Take a book
                    </button>
                    :
                    <Link to="/login">To take a book you must be log in</Link>
            }


        </div>
        {
            hireClick &&
            <div className="bookOperationDiv__bookSecondHalf--confirmDiv">
                    <span>
                        Confirm hiring a book. Book will be available for you for 14 days since now.
                        Take it from library as fast as it's possible.
                        If you don't give back book at time, the debt will be add to your account, 1zł per day
                    </span>
                <div>
                    <button onClick={hireBook}>Confirm</button>
                    <button onClick={doNotConfirm}>Go back</button>
                </div>
            </div>
        }

        {
            isHired &&
            <div className="bookOperationDiv__bookSecondHalf--confirmDiv">
                    <span>
                        You just hired the book, take it from library.
                    </span>
                <div>
                    <button onClick={accept}>OK</button>
                </div>
            </div>
        }

        {
            haveBook &&
            <div className="bookOperationDiv__bookSecondHalf--confirmDiv">
                    <span>
                        You have this book already hired ! Check your account
                    </span>
                <div>
                    <button onClick={accept}>OK</button>
                </div>
            </div>
        }
    </>
}