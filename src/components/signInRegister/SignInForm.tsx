import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ISignProps } from "./SignInRegister";
import { auth, db } from "../../firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface IUser {
  email: string | null;
  name?: string | undefined | null;
  id?: string
  uid?: string
}

export const SignInForm = (props: ISignProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string | undefined>("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      setToken(await auth.currentUser?.getIdToken());
      setUser({
        email: resp.user.email,
        id: resp.user.uid,
      });

      const q = query(
        collection(db, "coaches"),
        where("coachId", "==", resp.user.uid)
      );
      const querySnapshot = await getDocs(q);


      querySnapshot.docs.map((doc) => {
        setUser({
          email: resp.user.email,
          name: doc.data().name,
          id: doc.data().coachId,
          uid: doc.id
        });
      });
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    cookies.set("Authorization", token);
    props.checkLoggedIn();
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
