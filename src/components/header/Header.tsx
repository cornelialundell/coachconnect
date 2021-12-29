import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import Logo from "./../../img/Logo.svg";

interface IHeaderProps {
  url: string;
  cookie: string;
  checkCookie(): void;
  checkUrl(): void;
}
export const Header = (props: IHeaderProps) => {
  const navigate = useNavigate(); 
  const cookies = new Cookies();


  const signOut = async () => {
    cookies.remove('Authorization');
    localStorage.removeItem("user");
    await auth.signOut()
    props.checkCookie();
  }
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
          {props.cookie ? (
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
