import { useParams } from "react-router";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { EditTemplate } from "./editTemplate/EditTemplate";

export interface IClient {
  name: string;
  goals: string;
  id: string;
  template: ITemplate[];
}

export interface ITemplate {
  field: string;
}

export const ClientInfo = () => {
  let { paramId } = useParams();
  const coach = JSON.parse(localStorage.getItem("user") || "");
  const [client, setClient] = useState<IClient>();
  const [id, setId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false)

  const getClient = async () => {
    const q = query(
      collection(db, "coaches"),
      where("coachId", "==", coach.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      setId(doc.id);
    });

    if (!id || !paramId) return;
    const docRef = doc(db, "coaches", id, "clients", paramId);
    const docData = await getDoc(docRef);
    if (docData.exists()) {
      setClient({
        name: docData.data().name,
        goals: docData.data().goals,
        id: docData.id,
        template: docData.data().template,
      });
    } else {
      console.log("no client found");
    }
  };

  useEffect(() => {
    getClient();
  }, [id]);

  if (!editMode) {
    return (
      <section className="p-v-6">
        <div className="container-medium column justify-center align-items-center">
          <p>Name: {client?.name}</p>
          <p>Goals: {client?.goals}</p>
          <h4>Template</h4>
          {client?.template.map((field, index) => {
            return <p key={index}>{field}</p>;
          })}
          <button className="purple-btn">Edit template</button>
        </div>
      </section>
    );
  }
  return(
    <EditTemplate client={client}/>
  )
};
