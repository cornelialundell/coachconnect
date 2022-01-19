import { useParams } from "react-router";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { EditFieldClient } from "./editTemplate/EditFieldClient";

export interface IClient {
  name: string | undefined;
  goals: string | undefined;
  email: string | undefined;
  id: string;
  coachId?: string;
  template?: ITemplate[];
}

export interface ITemplate {
  field: string;
  id: string;
}

export const ClientInfo = () => {
  let { paramId } = useParams();
  const currentUser = auth.currentUser;
  const [client, setClient] = useState<IClient>();
  const [newField, setNewField] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const addIcon = <FontAwesomeIcon icon={faPlusCircle} />;
  const [justify, setJustify] = useState("justify-end");

  const getClient = async () => {
    if (!currentUser || !paramId) return;

    const clientRef = doc(db, "coaches", currentUser.uid, "clients", paramId);
    const docSnap = await getDoc(clientRef);
    const templateRef = collection(
      db,
      "coaches",
      currentUser.uid,
      "clients",
      paramId,
      "template"
    );
    const querySnapshot = await getDocs(templateRef);
    let list: any = [];
    querySnapshot.forEach((doc) => {
      list.push({ field: doc.data().field, id: doc.id });
    });

    if (docSnap.exists()) {
      setClient({
        name: docSnap.data().name,
        goals: docSnap.data().goals,
        email: docSnap.data().email,
        id: docSnap.id,
        template: list,
      });
    }
  };

  const addField = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newField);

    if (!currentUser || !client) return;
    const newTemplateCollectionRef = collection(
      db,
      "coaches",
      currentUser?.uid,
      "clients",
      client?.id,
      "template"
    );

    await addDoc(newTemplateCollectionRef, { field: newField });
    getClient();
    setNewField("");
    setShowAddInput(false);
  };

  const editField = async (inputText: string, id: string) => {
    if (!currentUser || !client) return;

    const fieldDoc = doc(
      db,
      "coaches",
      currentUser.uid,
      "clients",
      client.id,
      "template",
      id
    );
    const newFields = { field: inputText };
    await updateDoc(fieldDoc, newFields);
    getClient();
  };
  useEffect(() => {
    getClient();
    if (showAddInput) {
      setJustify("justify-between");
    } else {
      setJustify("justify-end");
    }
  }, [currentUser, showAddInput]);

  return (
    <>
      <section className="p-v-6">
        <div className="container-medium column justify-center align-items-center">
          <p>Name: {client?.name}</p>
          <p>Goals: {client?.goals}</p>
          <h4 className="p-t-3">Template</h4>
          <div className="col-4 column justify-center align-items-center">
            <div className="col-12 row justify-end p-t-2">
              {client?.template?.map((field, index) => {
                return (
                  <EditFieldClient
                    key={index}
                    field={field.field}
                    id={field.id}
                    getClient={getClient}
                    editField={editField}
                    clientId={client.id}
                  />
                );
              })}
              <div className={"col-12 row " + justify}>
                {showAddInput ? (
                  <form onSubmit={(e) => addField(e)} className="col-10">
                    <input
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNewField(e.target.value);
                      }}
                      value={newField}
                    />
                  </form>
                ) : (
                  <></>
                )}

                <button
                  className="icon clr-purple size-large p-t-3"
                  onClick={() => {
                    setShowAddInput(!showAddInput);
                  }}
                >
                  {addIcon}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
