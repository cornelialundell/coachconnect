import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { IUser } from "../signInRegister/SignInForm";
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
  const [newField, setNewField] = useState('');
  const [id, setId] = useState<string | null>(null);

  const getCoach = async () => {
    const q = query(
      collection(db, "coaches"),
      where("coachId", "==", coach.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(async (doc) => {
      setId(doc.id);
    });

    let list: any = [];
    if (id) {
      const usersCollectionRef = collection(
        db,
        "coaches",
        id,
        "defaultTemplate"
      );
      const orderedCollectionRef = query(usersCollectionRef);
      const data = await getDocs(orderedCollectionRef);
      data.docs.map((doc) => {
        list.push({ field: doc.data().field, id: doc.id });
      });
      setDefaultTemplate(list);
    }
  };

  const checkDefaultTemplate = () => {
    getCoach();
  };


  const editField = async (value:string, fieldId:string) => {
    if (!id) return
    const fieldDoc = doc(db, 'coaches', id, 'defaultTemplate', fieldId)
    await deleteDoc(fieldDoc)
    const usersCollectionRef = collection(
      db,
      "coaches",
      id,
      "defaultTemplate"
    );
    await addDoc(usersCollectionRef, { field: value });
    getCoach();
  };

  const addField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return
    const usersCollectionRef = collection(
      db,
      "coaches",
      id,
      "defaultTemplate"
    );
    await addDoc(usersCollectionRef, { field: newField });
    setNewField("");
    getCoach();
  };

  useEffect(() => {
    getCoach();
  }, [id]);
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
              coachId={id}
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
