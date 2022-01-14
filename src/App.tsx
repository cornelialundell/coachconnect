import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landingPage/LandingPage";
import { Header } from "./components/header/Header";
import { SignIn } from "./components/signInRegister/SignInRegister";
import Cookies from "universal-cookie";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ClientInfo } from "./components/clientInfo/ClientInfo";
import { DefaultTemplate } from "./components/defaultTemplate/DefaultTemplate";
import { auth, db } from "./firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface ICoach {
  username?: string;
  email?: string;
}

export interface ICoachProps {
  coach: ICoach | undefined
}

function App() {
  const cookies = new Cookies();
  const [cookie, setCookie] = useState(cookies.get("Authorization"));
  const [url, setUrl] = useState('')
  const [coach, setCoach] = useState<ICoach>();

  const [userLoggedIn, setUserLoggedIn] = useState(auth.currentUser)

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setUserLoggedIn(user)
    }
  })

  const checkLoggedIn= () => {
    setUserLoggedIn(auth.currentUser)
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
  }

useEffect(() => {
  getCoach()
}, [userLoggedIn])

 

  return (
    <>
      <Header url={url} checkUrl={checkUrl} cookie={cookie} coach={coach} checkLoggedIn={checkLoggedIn}/>
      <Routes>
        {userLoggedIn ? (
          <Route path="/" element={<Dashboard coach={coach}/>} />
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
