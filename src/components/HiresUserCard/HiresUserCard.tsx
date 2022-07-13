import React, {useEffect, useState} from "react";
import "./HiresUserCard.css";
import {HireObject, HireObjectAdmin} from "../../utils/types";
import {useUserContext} from "../../utils/UserContext";
import {isExpire} from "../../utils/utils";


export const HiresUserCard = () => {

    const [hires, setHires] = useState<null | HireObject[] | HireObjectAdmin[]>(null);

    const [debt, setDebt] = useState<number>(0);

    const context = useUserContext();

    useEffect(() => {
        if (context.userState.is_admin) {
            (async () => {
                const resp = await fetch(`http://localhost:3001/debt`);
                const userHiresWithDebt = await resp.json() as HireObjectAdmin[] | null;
                if (!userHiresWithDebt) return;
                setHires(userHiresWithDebt);
            })();
        } else {
            (async () => {
                const resp = await fetch(`http://localhost:3001/hire/${context.userState.id}`);
                const userHires = await resp.json() as HireObject[] | null;
                setHires(userHires);
                const respDebt = await fetch(`http://localhost:3001/debt/${context.userState.id}`);
                const debt = await respDebt.json();
                setDebt(debt);
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

    const getDebtByHire = async (id: string): Promise<number> => {
        const resp = await fetch(`http://localhost:3001/debt/hire/${id}`);
        return await resp.json();
    }

    return context.userState.name !== "" ? <section className="hireSection">
            <h2>{context.userState.is_admin ? "Books of clients" : "Your books"}</h2>
            <table className="hireSection--table">
                <thead className="hireSection--table--thead">
                <tr className="hireSection--table--thead--tr">
                    <td>ID</td>
                    <td>Book identification</td>
                    <td>Title</td>
                    <td>Expiration date (Year:Month:Day)</td>
                    {

                        context.userState.is_admin ?
                                <>
                                    <td>Action</td>
                                    <td>Debt</td>
                                </> : null

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
                            <td style={{
                                border: isExpire(hire.expire_date) ? "2px solid red" : "5px solid green"
                            }}
                            >{hire.expire_date.toString().substring(0, 10)}</td>
                            {
                                context ?
                                    context.userState.is_admin ?
                                        <>
                                            <td>
                                                <button onClick={() => deleteHire(hire.id)}>DELETE</button>
                                            </td>
                                            <td>
                                                {(hire as HireObjectAdmin).debt}
                                            </td>
                                        </> : null
                                    : null
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {
                debt !== 0 && debt ?
                    <span className="hireSection--debtSpan">Your debt is {debt} zł</span> :
                    null
            }
        </section>
        : null
}