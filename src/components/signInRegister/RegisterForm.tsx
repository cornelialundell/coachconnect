import { createUserWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { auth, createUserDocument, db } from "../../firebase-config";
import { IUser } from "./SignInForm";
import { ISignProps } from "./SignInRegister";

export const RegisterForm = (props: ISignProps) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState<string | undefined>("");
  const [currentUser, setUser] = useState<IUser>();
  const defaultTemplateList = ['hunger', 'mood', 'sleep']
  const usersCollectionRef = collection(db, "coaches");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      setUser({
        email: user.email,
        id: user.uid,
        name: username,
      });
      
        await createUserDocument(user, username);
        const templateRef = collection(db, 'coaches', user.uid, 'defaultTemplate')

        defaultTemplateList.map(async (item) => {
          await addDoc(templateRef, { field: item });
        })
      
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    cookies.set("Authorization", token);
    props.checkLoggedIn();
  }, [currentUser]);

  return (
    <form className="row justify-between" onSubmit={(e) => register(e)}>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        value={email}
        placeholder="email"
      ></input>
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
        value={username}
        placeholder="username"
      ></input>
      <input
        type="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        value={password}
        placeholder="password"
      ></input>
      <button type="submit" className="purple-btn">
        Sign up
      </button>
    </form>
  );
};
