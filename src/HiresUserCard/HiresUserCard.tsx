import React, {useContext, useEffect, useState} from "react";
import "./HiresUserCard.css";
import {HireObject} from "../utils/types";
import {userContext} from "../utils/UserContext";


export const HiresUserCard = () => {

    const [hires, setHires] = useState<null | HireObject[]>(null);

    const context = useContext(userContext);

    useEffect(() => {
        if (!context) return;

        if (context.userState.is_admin) {
            (async () => {
                const resp = await fetch(`http://localhost:3001/hire`);
                const userHires = await resp.json() as HireObject[] | null;
                setHires(userHires);
            })();
        } else {
            (async () => {
                const resp = await fetch(`http://localhost:3001/hire/${context.userState.id}`);
                const userHires = await resp.json() as HireObject[] | null;
                setHires(userHires);
            })();
        }
    }, []);

    const deleteHire = async (id: string): Promise<void> => {
        console.log(id);
        const resp = await fetch(`http://localhost:3001/hire/${id}`, {
            method: "DELETE"
        });
        const isDeleted = await resp.json();
        console.log(isDeleted);

        const userHiresResponse = await fetch(`http://localhost:3001/hire`);
        const userHires = await userHiresResponse.json() as HireObject[] | null;
        setHires(userHires);
    }

    return context?.userState.name !== "" ? <section className="hireSection">
            <table className="hireSection--table">
                <thead className="hireSection--table--thead">
                <tr className="hireSection--table--thead--tr">
                    <td>ID</td>
                    <td>Book identification</td>
                    <td>Title</td>
                    <td>Expiration date</td>
                    {
                        context ?
                            context.userState.is_admin ?
                                <td>Action</td> : null
                            : null
                    }
                </tr>
                </thead>
                <tbody className="hireSection--table--tbody">
                {
                    hires &&
                    hires.map(hire => (
                        <tr key={hire.id} className="hireSection--table--tbody--tr">
                            <td>{hire.id}</td>
                            <td>{hire.book_id}</td>
                            <td>{hire.title}</td>
                            <td>{hire.expire_date.toString()}</td>
                            {
                                context ?
                                    context.userState.is_admin ?
                                        <td>
                                            <button onClick={() => deleteHire(hire.id)}>DELETE</button>
                                        </td> : null
                                    : null
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </section>
        : null
}