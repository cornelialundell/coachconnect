import { useEffect, useState } from "react";
import { IUser } from "../signInRegister/SignInForm";

export const Dashboard = () => {
  let [user, setUser] = useState<IUser>();

  useEffect(() => {
    let userFromLS: IUser = JSON.parse(localStorage.getItem("user") || "");
    setUser(userFromLS);
  }, []);
  
  return (
    <section className="bg-linear full-height row align-items-center">
      <div className="container-medium row">
        <h2>Välkommen <span className="underline">{user?.email}</span></h2>
      </div>
    </section>
  );
};
