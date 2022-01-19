import { useEffect, useState } from "react";
import { auth, db } from "../../firebase-config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router";
import { IClient } from "../clientInfo/ClientInfo";
import { ICoachProps } from "../../App";



export const Dashboard = (props: ICoachProps) => {
  const [user, setUser] = useState(auth.currentUser);
  const [showInviteLink, setShowInviteLink] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [clients, setClients] = useState<IClient[]>([]);
  const navigate = useNavigate();
  const textToCopy = `localhost:3000/register/${user?.uid}`


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
        list.push({email:doc.data().email, name: doc.data().name, goals: doc.data().goals, id: doc.id});
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
        <div className="col-6 phone-col-12">
          <h2>
            Välkommen <span className="underline">{props.coach?.username}</span>
          </h2>
        </div>
        <div className="col-6 bg-white p-4 box-shadow phone-col-12">
          <div className="row justify-between">
          <button className="purple-btn" onClick={() => {navigate("/defaultTemplate")}}>Edit default template</button>
          <button className="purple-btn" onClick={() => {setShowInviteLink(!showInviteLink)}}>Invite customers</button>
          {showInviteLink ? (
            <div className="row slide-from-top">
              <p>{textToCopy}</p>
              <button onClick={() => {navigator.clipboard.writeText(textToCopy); setIsCopied(true); setTimeout(() => setIsCopied(false), 1000)}}>Copy</button>
              {isCopied ? (
                <p className="slide-up-down">Copied!</p>
              ): (<></>)}
              </div>
          ):(
            <></>
          )}
          </div>
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
