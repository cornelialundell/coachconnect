import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router";
import { IClient } from "../clientInfo/ClientInfo";
import { ICoachProps } from "../../App";



export const Dashboard = (props: ICoachProps) => {
  const [user, setUser] = useState(auth.currentUser);

  const [clients, setClients] = useState<IClient[]>([]);
  const navigate = useNavigate();


  const getClients = async () => {
    if (!user) return;
      const usersCollectionRef = collection(
        db,
        "coaches",
        user.uid,
        "clients"
      );

      let list: IClient[] = [];
      const orderedCollectionRef = query(usersCollectionRef);
      const data = await getDocs(orderedCollectionRef);
      data.docs.map((doc) => {
        list.push({ name: doc.data().name, goals: doc.data().goals, template: doc.data().template, id: doc.id });
      });
      setClients(list);
  };


  useEffect(() => {
    setUser(auth.currentUser)
    getClients();
  }, [user]);

  return (
    <section className="bg-linear full-height row align-items-center">
      <div className="container-medium row justify-between">
        <div className="col-6">
          <h2>
            Välkommen <span className="underline">{props.coach?.username}</span>
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
                    navigate(`/clientinfo/${client.id}`)
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
