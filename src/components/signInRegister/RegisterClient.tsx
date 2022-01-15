import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, createClientDocument } from "../../firebase-config";

interface IRegisterClient {
    email: string;
    name: string;
    goals: string;
}

export const RegisterClient = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [goals, setGoals] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newClient, setNewClient] = useState<IRegisterClient>()
const coachId = useParams();

  const registerClient = async (e: React.FormEvent) => {
    e.preventDefault();

    //VALIDATION
    if (email === "" || name === "" || password === "" || goals === "") {
      setErrorMessage("Please fill out all fields");
      return;
    }

    setNewClient({
        email: email,
        name: name,
        goals: goals,
    })
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    await createClientDocument(user, coachId, email, name, goals);

  };

  const checkPasswords = () => {
    if (password !== passwordRepeat) {
      setErrorMessage(`Passwords doesn't match`);
      return;
    }
    setErrorMessage("");
  };

  useEffect(() => {
    checkPasswords();
  }, [passwordRepeat]);
  return (
    <form className="row justify-between" onSubmit={(e) => registerClient(e)}>
      <div className="form-group-field col-6">
        <input
          type="text"
          placeholder="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setErrorMessage("");
          }}
          value={email}
        ></input>
      </div>
      <div className="form-group-field col-6">
        <input
          type="text"
          placeholder="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
          value={name}
        ></input>
      </div>
      <div className="form-group-field col-6">
        <input
          type="password"
          placeholder="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          value={password}
        ></input>
      </div>
      <div className="form-group-field col-6">
        <input
          type="password"
          placeholder="repeat password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordRepeat(e.target.value);
            setErrorMessage("");
          }}
          value={passwordRepeat}
        ></input>
      </div>
      <textarea
        placeholder="goals"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setGoals(e.target.value);
          setErrorMessage("");
        }}
        value={goals}
      />
      <p className="clr-danger">{errorMessage}</p>
      <button type="submit" className="purple-btn">
        Register
      </button>
    </form>
  );
};
