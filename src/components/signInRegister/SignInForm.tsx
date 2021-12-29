import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/user";
import Cookies from "universal-cookie";
import { ISignProps } from "./SignInRegister";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";

export interface IUser {
  email: string | null,
  token: string | null | undefined
}

export const SignInForm = (props: ISignProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string | undefined>('')
  const navigate = useNavigate();
  const cookies = new Cookies();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      setToken(await auth.currentUser?.getIdToken())

      setUser({
          email: resp.user.email,
          token: token
      }
      )
  } catch (error) {console.log(error)}

    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    cookies.set("Authorization", token)
    props.checkCookie();
  }, [user]);

  return (
    <form className="row justify-between" onSubmit={(e) => signIn(e)}>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        value={email}
      ></input>
      <input
        type="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        value={password}
      ></input>
      <button type="submit" className="purple-btn">
        Sign in
      </button>
    </form>
  );
};
