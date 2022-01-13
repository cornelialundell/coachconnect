import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { Fields } from "./Fields";

export interface IDefaultTemplate {
  field: string;
  id: string;
}

export const DefaultTemplate = () => {
  const coach = JSON.parse(localStorage.getItem("user") || "");
  const [defaultTemplate, setDefaultTemplate] = useState<IDefaultTemplate[]>(
    []
  );
  const [newField, setNewField] = useState("");
  const [id, setId] = useState<string | null>(null);
  const userLoggedIn = auth.currentUser;



  const getCoach = async () => {
    let list: any = [];

    if (!userLoggedIn) return
    const usersCollectionRef = collection(
      db,
      "coaches",
      userLoggedIn?.uid,
      "defaultTemplate"
    );
    const orderedCollectionRef = query(usersCollectionRef);
    const data = await getDocs(orderedCollectionRef);
    data.docs.map((doc) => {
      list.push({ field: doc.data().field, id: doc.id });
    });
    setDefaultTemplate(list);
  };

  const checkDefaultTemplate = () => {
    getCoach();
  };

  const editField = async (value: string, fieldId: string) => {
    if (!userLoggedIn) return
    const fieldDoc = doc(db, "coaches", userLoggedIn?.uid, "defaultTemplate", fieldId);
    const newFields = { field: value };
    await updateDoc(fieldDoc, newFields);
    getCoach();
  };

  const addField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLoggedIn) return
    const usersCollectionRef = collection(
      db,
      "coaches",
      userLoggedIn?.uid,
      "defaultTemplate"
    );


    await addDoc(usersCollectionRef, { field: newField });
    setNewField("");
    getCoach();
  };

  useEffect(() => {
    getCoach();
  }, [userLoggedIn]);
  return (
    <section>
      <div className="container-medium ">
        <h1>hej {coach.id}</h1>
        <h2>Your default Template</h2>
        {defaultTemplate.map((field, index) => {
          return (
            <Fields
              key={index}
              field={field.field}
              id={field.id}
              coachId={userLoggedIn?.uid}
              defaultTemplate={defaultTemplate}
              checkDefaultTemplate={checkDefaultTemplate}
              editField={editField}
            />
          );
        })}
        <div>
          <form onSubmit={(e) => addField(e)}>
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewField(e.target.value);
              }}
              value={newField}
            ></input>
            <button type="submit" className="purple-btn">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
