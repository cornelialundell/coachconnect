import React, { useEffect, useState } from "react";
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
import { auth, db } from "../../firebase-config";

interface IProps {
  field: string;
  id: string;
  coachId: string | null | undefined;
  defaultTemplate: Array<T>;
  checkDefaultTemplate(): void;
  editField(value: string, id: string): void;
}

interface T {
  field: string;
}

export const Fields = (props: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newField, setNewField] = useState("");

  const deleteField = async () => {
    if (!props.coachId) return;
    const fieldDoc = doc(
      db,
      "coaches",
      props.coachId,
      "defaultTemplate",
      props.id
    );
    await deleteDoc(fieldDoc);
    props.checkDefaultTemplate();
  };

  const saveField = async (e: React.FormEvent) => {
    e.preventDefault();
    props.editField(newField, props.id);
    setIsEdit(!isEdit);
  };

  return (
    <div className="row p-v-1">
      {!isEdit ? (
        <>
          <p>{props.field}</p>
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <button onClick={deleteField}>Delete</button>
        </>
      ) : (
        <form onSubmit={(e) => saveField(e)}>
          <input
            type="text"
            placeholder={props.field}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewField(e.target.value);
            }}
            value={newField}
          ></input>
          <button type="submit" className="purple-btn">
            Save
          </button>
          <button onClick={() => setIsEdit(!isEdit)} className="purple-btn">
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};
