import React, {useEffect, useState} from 'react';
import {PageHeader} from "../../components/PageHeader/PageHeader";
import {BookObject} from "../../utils/types";
import {Link} from "react-router-dom";

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
        <PageHeader/>
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/>
        {
            books.map(book => (
                <div key={book.id}>
                    <span>{book.title}</span>
                    <span>{book.genre}</span>
                    <span>{book.year}</span>
                    <span>{book.amount}</span>
                    <span>{book.id}</span>
                    <Link to={`/book/${book.id}`}>
                        <button>Sprawdź</button>
                    </Link>
                </div>
            ))
        }
    </>
}