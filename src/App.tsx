import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landingPage/LandingPage";
import { Header } from "./components/header/Header";
import { SignIn } from "./components/signInRegister/SignInRegister";
import Cookies from "universal-cookie";
import { Dashboard } from "./components/dashboard/Dashboard";

export interface IClient {
  name: string;
}

export interface ServiceResponse<T> {
  data: T;
}

function App() {
  const cookies = new Cookies();
  const [cookie, setCookie] = useState(cookies.get("Authorization"));
  const [url, setUrl] = useState('')

  const checkCookie = () => {
    setCookie(cookies.get("Authorization"));
  };

  const checkUrl = () => {
    let currUrl = window.location.pathname;
    if( currUrl.charAt( 0 ) === '/' ){
      currUrl = currUrl.slice( 1 );
    }
    setUrl(currUrl)
  }


  useEffect(() => {
    setCookie(cookies.get("Authorization"));
    checkUrl();
  }, [cookie, url]);

  return (
    <>
      <Header url={url} cookie={cookie} checkCookie={checkCookie}/>
      <Routes>
        {cookie ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}

        <Route path="/signin" element={<SignIn checkCookie={checkCookie} />} />
        <Route path="/register" element={<SignIn checkCookie={checkCookie} />} />
      </Routes>
    </>
  );
}

export default App;
