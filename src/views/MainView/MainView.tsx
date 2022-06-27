import React, {useEffect, useState} from 'react';
import {PageHeader} from "../../components/PageHeader/PageHeader";
import {BookObject} from "../../utils/types";
import {Link} from "react-router-dom";
import "./MainView.css";

export const MainView = () => {
    const [books,setBooks] = useState<BookObject[]>([]);
    const [search,setSearch] = useState<string>("");

    useEffect(()=> {
        (async()=>{
            if(search!=="") {
                const resp = await fetch(`http://localhost:3001/book/title/${search}`);

                const booksFromFetch = await resp.json();

                if (booksFromFetch) {
                    setBooks(booksFromFetch);
                }
            }
            else {
                const resp = await fetch("http://localhost:3001/book",{
                    method : "GET"
                })

                const booksFromFetch = await resp.json();

                if (booksFromFetch) {
                    setBooks(booksFromFetch);
                }
            }
        })();
    },[search])

    useEffect(()=>{
        (async()=>{
            const resp = await fetch("http://localhost:3001/book",{
                method : "GET"
            })

            const booksFromFetch = await resp.json();

            if (booksFromFetch) {
                setBooks(booksFromFetch);
            }
        })();
    },[]);

    return <>
        <div className="userSection__header">
            <PageHeader/>
            <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                className="userSection__header--search"
                placeholder="Search"
            />
        </div>
        <main className="bookContainer">
            {
                books.map(book => (
                    <div key={book.id} className="singleBook">
                        <span>Title : {book.title}</span>
                        <span>Genre : {book.genre}</span>
                        <span>Year of release : {book.year}</span>
                        <span>Available amount : {book.amount}</span>
                        <Link to={`/book/${book.id}`}>
                            <button>Check book</button>
                        </Link>
                    </div>
                ))
            }
        </main>
    </>
}