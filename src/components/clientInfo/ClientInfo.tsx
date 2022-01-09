import { useParams } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { IClient } from "../dashboard/Dashboard";

interface IClientInfoProps {
  client: IClient
}

export const ClientInfo = (props: IClientInfoProps) => {
  //   let { id } = useParams();
  //   const coach = JSON.parse(localStorage.getItem("user") || "");
  //   const [clients, setClients] = useState<IClient[]>()

  //   const getClient = async () => {
  //     const q = query(collection(db, "coaches"), where("coachId", "==", coach.id));
  //     const querySnapshot = await getDocs(q);
  //     console.log(querySnapshot);
  //     querySnapshot.docs.map((doc) => {
  //       setClients(doc.data().clients)
  //     });

  //     clients?.map((client) => {
  //         console.log(client.id)
  //     })
  //   };

  useEffect(() => {
    console.log(props)
    // getClient();
  }, []);
  return (
    <section className="p-v-6">
      <div className="container-medium column justify-center align-items-center">
        <p>Name: {props.client.name}</p>
        <p>Goals: {props.client.goals}</p>
        <h4>Template</h4>
        {props.client.template.map((field, index) => {
          return <p key={index}>{field}</p>
        })}
        <button className="purple-btn">Edit template</button>
      </div>
    </section>
  );
};
