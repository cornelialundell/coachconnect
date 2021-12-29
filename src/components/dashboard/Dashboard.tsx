import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { IUser } from "../signInRegister/SignInForm";
import { collection, getDocs, query, where } from "firebase/firestore";

interface ICoach {
  name: string;
  id: string;
  email: string;
}

interface IClient {
  name: string;
}
export const Dashboard = () => {
  const coach = JSON.parse(localStorage.getItem("user") || "");
  const [clients, setClients] = useState<IClient[]>([]);

  const getUsers = async () => {
    const q = query(
      collection(db, "coaches"),
      where("coachId", "==", coach.id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((doc) => {
      setClients(doc.data().clients);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="bg-linear full-height row align-items-center">
      <div className="container-medium row justify-between">
        <div className="col-6">
          <h2>
            Välkommen <span className="underline">{coach?.name}</span>
          </h2>
        </div>
        <div className="col-6 bg-white p-4 box-shadow">
          {clients?.length === 0 ? (
            <h4>Du har inga kunder</h4>
          ) : (
            <h4>Dina kunder är:</h4>
          )}
          {clients?.map((client, index) => {
            return <p key={index}>{client?.name}</p>;
          })}
        </div>
      </div>
    </section>
  );
};
