import React, {useEffect, useState} from "react";
import {BookObject} from "../../utils/types";
import {useParams} from "react-router-dom";

export const BookView = () => {
    const [book, setBook] = useState<BookObject | null>(null);
    const {id} = useParams();
    useEffect(() => {
        (async () => {
            const resp = await fetch(`http://localhost:3001/book/id/${id}`);
            const bookFromFetch = await resp.json();
            setBook(bookFromFetch);
        })();
    }, []);
    return <div>
        {
            book && <>
                <span>{book.title}</span>
                <span>{book.genre}</span>
                <span>{book.year}</span>
                <span>{book.amount}</span>
                <span>{book.id}</span>
            </>
        }
    </div>
}