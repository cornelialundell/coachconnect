import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/landingPage/LandingPage";
import { Header } from "./components/header/Header";
import { SignIn } from "./components/signIn/SignIn";
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
  const [cookie, setCookie] = useState(cookies.get('Authorization'));


  const checkCookie = () => {
    setCookie(cookies.get("Authorization"));
  }

  useEffect(() => {
    setCookie(cookies.get("Authorization"));
  }, [cookie]);

  return (
    <>
      <Header />
      <Routes>
        {console.log("cookie " + cookie)}
        {cookie ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}

        <Route path="/signin" element={<SignIn checkCookie={checkCookie}/>} />
      </Routes>
    </>
  );
}

export default App;
