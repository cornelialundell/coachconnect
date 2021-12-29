import { createUserWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { auth, db } from "../../firebase-config";
import { IUser } from "./SignInForm";
import { ISignProps } from "./SignInRegister";

export const RegisterForm = (props: ISignProps) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState<string | undefined>("");
  const [user, setUser] = useState<IUser>();
  const usersCollectionRef = collection(db, "coaches");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      setToken(await auth.currentUser?.getIdToken())
      setUser({
        email: resp.user.email,
        id: resp.user.uid,
        name: username
      });
      
      await addDoc(usersCollectionRef, {name: username, coachId: resp.user.uid})

    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    cookies.set("Authorization", token);
    props.checkCookie();
  }, [user]);

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
