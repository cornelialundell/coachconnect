import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router";
import { ClientInfo } from "../clientInfo/ClientInfo";

interface ICoach {
  name: string;
  id: string;
  email: string;
}

export interface ITemplate {
  field: string
}

export interface IClient {
  name: string;
  goals: string;
  id: string;
  template: ITemplate[]
}
export const Dashboard = () => {
  const coach = JSON.parse(localStorage.getItem("user") || "");
  const [clients, setClients] = useState<IClient[]>([]);
  const [id, setId] = useState<string | null>(null)
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<IClient | null>(null)

  const getClients = async () => {
    const q = query(
      collection(db, "coaches"),
      where("coachId", "==", coach.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      setId(doc.id)
    });

    if (id) {
      const usersCollectionRef = collection(
        db,
        "coaches",
        id,
        "clients"
      );

      let list: IClient[] = [];
      const orderedCollectionRef = query(usersCollectionRef);
      const data = await getDocs(orderedCollectionRef);
      data.docs.map((doc) => {
        list.push({ name: doc.data().name, goals: doc.data().goals, template: doc.data().template, id: doc.id });
        console.log(list)
      });
      setClients(list);
    }
  };


  useEffect(() => {
    getClients();
  }, [id]);

  if (selectedUser) {
    return (
      <ClientInfo client={selectedUser}/>
    )
  }
  return (
    <section className="bg-linear full-height row align-items-center">
      <div className="container-medium row justify-between">
        <div className="col-6">
          <h2>
            Välkommen <span className="underline">{coach?.name}</span>
          </h2>
        </div>
        <div className="col-6 bg-white p-4 box-shadow">
          <button className="purple-btn" onClick={() => {navigate("/defaultTemplate")}}>Edit default template</button>
          {clients?.length === 0 ? (
            <h4>Du har inga kunder</h4>
          ) : (
            <h4>Dina kunder är:</h4>
          )}
          {clients.map((client, index) => {
            return (
              <div key={index}>
                <a
                  onClick={() => {
                    setSelectedUser(client)
                  }}
                >
                  {client.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
