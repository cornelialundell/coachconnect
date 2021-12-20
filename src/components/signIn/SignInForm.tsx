import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "./../../services/user";
import Cookies from "universal-cookie";
import { ISignProps } from "./SignIn";

export interface IUser {
  name: string;
  id: number;
  email: string;
  token: string;
}

export const SignInForm = (props: ISignProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<IUser>();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.logIn(email, password).then((resp) => {
        setUser({
          name: resp.data.user.username,
          id: resp.data.user.id,
          email: resp.data.user.email,
          token: resp.data.jwt,
        });
        cookies.set("Authorization", resp.data.jwt);
        props.checkCookie();
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
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
