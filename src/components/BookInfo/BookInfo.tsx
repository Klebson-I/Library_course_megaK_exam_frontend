import React from "react";
import "./BookInfo.css";
import {AuthorObject, BookObject} from "../../utils/types";

interface Props {
    book: BookObject | null;
    id: string;
    authors: AuthorObject[] | null;
}

export const BookInfo = (props: Props) => {

    if (!props.book) return null;

    const createAuthorsString = (): string => {
        if (!props.authors) return "";

        let str = "";

        str = props.authors.reduce((prev, curr) => {
            return prev + `${curr.name} ${curr.surname}, `;
        }, "");

        return str.substring(0, str.split("").length - 2);
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

    </div>
}