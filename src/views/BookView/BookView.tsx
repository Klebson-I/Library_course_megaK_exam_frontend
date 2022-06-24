import React, {useEffect, useState} from "react";
import {AuthorObject, BookObject} from "../../utils/types";
import {Link, useParams} from "react-router-dom";
import {BookInfo} from "../../components/BookInfo/BookInfo";
import bookPhoto from "../../book.jpg";
import arrow from "../../backarrow.png";
import "./BookView.css";

export const BookView = () => {
    const [book, setBook] = useState<BookObject | null>(null);

    const {id} = useParams();

    const [authors, setAuthors] = useState<AuthorObject[] | null>(null);

    useEffect(() => {
        (async () => {
            const respBook = await fetch(`http://localhost:3001/book/id/${id}`);

            const bookFromFetch: BookObject | null = await respBook.json();

            setBook(bookFromFetch);

            const respAuthor = await fetch(`http://localhost:3001/author/${id}`)

            const authorsFromFetch: AuthorObject[] | null = await respAuthor.json();

            setAuthors(authorsFromFetch);
        })();
    }, []);

    const refreshAmountOfBook = async () => {
        const respBook = await fetch(`http://localhost:3001/book/id/${id}`);

        const bookFromFetch: BookObject | null = await respBook.json();

        setBook(bookFromFetch);
    }

    return <section className="bookOperationDiv">
        <div className="bookOperationDiv__bookFirstHalf">
            <div className="bookOperationDiv__bookFirstHalf__returnDiv">
                <Link to="/"><img src={arrow} alt="backarrow"/></Link>
            </div>
            <img src={bookPhoto} alt="book_photo"/>
        </div>
        <BookInfo book={book} id={id as string} authors={authors} refreshAmountOfBook={refreshAmountOfBook}/>
    </section>
}


// <a href="https://www.flaticon.com/free-icons/camera-back" title="camera back icons">Camera back icons created by Freepik - Flaticon</a>