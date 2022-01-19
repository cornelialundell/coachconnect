import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landingPage/LandingPage";
import { Header } from "./components/header/Header";
import { SignIn } from "./components/signInRegister/SignInRegister";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ClientInfo, IClient } from "./components/clientInfo/ClientInfo";
import { DefaultTemplate } from "./components/defaultTemplate/DefaultTemplate";
import { auth, db } from "./firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ClientDashboard } from "./components/dashboard/ClientDashboard";

export interface ICoach {
  username?: string;
  email?: string;
}

export interface ICoachProps {
  coach: ICoach | undefined
}

function App() {
  const [url, setUrl] = useState('')
  const [coach, setCoach] = useState<ICoach>();
  const [client, setClient] = useState<IClient>()
  const [userLoggedIn, setUserLoggedIn] = useState(auth.currentUser)

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setUserLoggedIn(user)
    }
  })

  const checkLoggedIn= () => {
    setUserLoggedIn(auth.currentUser)
    checkUrl()
  };

  const checkUrl = () => {
    let currUrl = window.location.pathname;
    if( currUrl.charAt( 0 ) === '/' ){
      currUrl = currUrl.slice( 1 );
    }
    setUrl(currUrl)
  }

  const getCoach = async () => {
    if (!userLoggedIn) return;
    const hej = doc(db, 'coaches', userLoggedIn.uid);
    const hejjj = (await getDoc(hej)).data();

    if (hejjj) {
        setCoach({username: hejjj.username, email: hejjj.email})
    }
    if (!hejjj) {
      const getCoachRef = doc(db, 'clients', userLoggedIn.uid)
      const clientsCoach = (await getDoc(getCoachRef)).data()
      if (clientsCoach) {
        const coachId = clientsCoach.coachId
       const getClientRef = doc(db, 'coaches', coachId, 'clients', userLoggedIn.uid)
       const currentClient = (await getDoc(getClientRef))
       const templateRef = collection(db, 'coaches', coachId, 'clients', userLoggedIn.uid, 'template')
       const clientTemplate = await getDocs(templateRef)

       if (currentClient.exists()) {
        let list: any = []
        clientTemplate.forEach((doc) => {
            list.push(doc.data())
        })
        setClient({
          name: currentClient.data().name,
          email: currentClient.data().email,
          id:currentClient.id,
          goals: currentClient.data().goals,
          coachId: coachId,
          template: list
        })
       }
        
      }
  
    }
    if(coach || client) {
      setUrl('purple')
    }
  }

useEffect(() => {
  getCoach()
  checkUrl()
  if(userLoggedIn && coach || client && userLoggedIn) {
    setUrl('purple')
  }

}, [userLoggedIn, coach, client])

 
  return (
    <>
      <Header url={url} checkUrl={checkUrl} coach={coach} checkLoggedIn={checkLoggedIn}/>
      <Routes>
        {userLoggedIn && coach ? (
          <Route path="/" element={<Dashboard coach={coach}/>} />
        ) : (
          <></>
        )}
        {userLoggedIn && client ? (
          <Route path="/" element={<ClientDashboard client={client}/>} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}

        <Route path="/signin" element={<SignIn checkLoggedIn={checkLoggedIn}/>} />
        <Route path="/register" element={<SignIn checkLoggedIn={checkLoggedIn} />} />
        <Route path="/register/:paramId" element={<SignIn checkLoggedIn={checkLoggedIn} />} />
        <Route path="/defaultTemplate" element={<DefaultTemplate/>} />
        <Route path="/clientinfo/:paramId" element={<ClientInfo/>} />
      </Routes>
    </>
  );
}

export default App;
