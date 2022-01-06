import { useParams } from "react-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { IClient } from "../dashboard/Dashboard";


export const ClientInfo = (props: any) => {
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
    // getClient();
    console.log(props.client)
  }, []);
  return <p>{props.client.name}</p>;
};
