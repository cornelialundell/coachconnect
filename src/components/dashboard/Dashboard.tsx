import { useEffect, useState } from "react";
import { IUser } from "../signIn/SignInForm";

export const Dashboard = () => {
  let [user, setUser] = useState<IUser>();

  useEffect(() => {
    let userFromLS: IUser = JSON.parse(localStorage.getItem("user") || "");
    setUser(userFromLS);
  }, []);
  return (
    <section className="bg-linear full-height row align-items-center">
      <div className="container-medium row">
        <h2>Välkommen <span className="underline">{user?.name}</span></h2>
      </div>
    </section>
  );
};
