import { collection, setDoc, doc, Timestamp, getDocs } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../../firebase-config"
import { IClient } from "../clientInfo/ClientInfo"

interface IClientProps {
    client: IClient
}


export const ClientDashboard = (props: IClientProps) => {
    const [showSendUpdate, setShowSendUpdate] = useState(false)
    const [updates, setUpdates] = useState<any>([])
    const [newField, setNewField] = useState('')

    const sendForm = async (e: React.FormEvent) => {
        e.preventDefault()
        const date = (new Date()).toLocaleDateString()
        console.log(date)
        if (!props.client.coachId || !date) return;
        await setDoc(doc(db, 'coaches', props.client.coachId, 'clients', props.client.id, 'updates', date), {
            update: updates
          });
        setUpdates([])
    }

   
    return (
        <section>
            <div className="container-medium full-height column justify-center align-items-center">
            <p>Välkommen {props.client.name}</p>
            <button className="purple-btn" onClick={() => setShowSendUpdate(!showSendUpdate)}>Send weekly update</button>
            {showSendUpdate ? (
                <form onSubmit={(e) => sendForm(e)}>
                    {props.client.template?.map((field, index) => {
                    return (
                    <div key={index} className="form-group-field">                   
                        {updates.length !== 0 ? (
                            <textarea className="input" name={field.field} value={updates[index].value} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
                            return updates[index] = {field: field.field, value: e.target.value};
                        }}/>
                        ):(
                            <textarea className="input" name={field.field} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
                                return updates[index] = {field: field.field, value: e.target.value};
                            }}/>
                        )}
                        
                        <label htmlFor={field.field}>{field.field} </label>
                    </div>
                    )
                    })}
                <button className="purple-btn">Send</button>
                </form>
            ):(<></>)}
            </div>
        </section>
    )
}