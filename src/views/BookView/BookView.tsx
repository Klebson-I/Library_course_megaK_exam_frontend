import React, {useEffect, useState} from "react";
import {AuthorObject, BookObject} from "../../utils/types";
import {useParams} from "react-router-dom";
import {BookInfo} from "../../components/BookInfo/BookInfo";
import bookPhoto from "../../images/book.jpg";
import "./BookView.css";
import {PageTop} from "../../components/PageTop/PageTop";

export const BookView = () => {
    const [book, setBook] = useState<BookObject | null>(null);

    const [isBlur, setIsBlur] = useState<boolean>(false);

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

    return <>
        <PageTop/>
        <main className="singleBookView">
            <section className="bookOperationDiv">
                <div className="bookOperationDiv__bookFirstHalf">
                    <img src={bookPhoto} alt="book_photo" style={{
                        filter: isBlur ? "blur(10px)" : "none"
                    }}/>
                </div>
                <BookInfo
                    book={book}
                    id={id as string}
                    authors={authors}
                    refreshAmountOfBook={refreshAmountOfBook}
                    setIsBlur={setIsBlur}
                />
            </section>
        </main>
    </>


}


// <a href="https://www.flaticon.com/free-icons/camera-back" title="camera back icons">Camera back icons created by Freepik - Flaticon</a>