import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { ICoach, ICoachProps } from "../../App";
import { auth } from "../../firebase-config";
import Logo from "./../../img/Logo.svg";

interface IHeaderProps {
  url: string;
  cookie: string;
  checkLoggedIn(): void;
  checkUrl(): void;
  coach: ICoach | undefined
}
export const Header = (props: IHeaderProps) => {
  const navigate = useNavigate(); 
  const cookies = new Cookies();

  const userLoggedIn = auth.currentUser

  const signOut = async () => {
    await auth.signOut()
    props.checkLoggedIn()
  }

  // useEffect(() => {
  //   setUserLoggedIn(auth.currentUser)
  // }, [])





  return (
 
    <nav className={"row " + props.url}>
      <div className="col-6">
        <img src={Logo} onClick={() => {navigate("/"); props.checkUrl()}} />
      </div>
      <div className="col-6 row justify-end">
        <ul className="row">
          <li>
            <a tabIndex={1}>About</a>
          </li>
          <li>
            <a tabIndex={2}>Pricing</a>
          </li>
          {userLoggedIn !== null ? (
            <li>
              <a onClick={signOut} tabIndex={3} onKeyPressCapture={signOut}>Sign out</a>
            </li>
          ) : (
            <li>
            <a tabIndex={3} href="/register">Sign up</a>
          </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
