import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RegisterClient } from "./RegisterClient";
import { RegisterForm } from "./RegisterForm";
import { SignInForm } from "./SignInForm";

export interface ISignProps {
  checkLoggedIn(): void;
}
export const SignIn = (props: ISignProps) => {
  let { paramId } = useParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.pathname);
  }, []);

  if (paramId) {
    return(
     <section className="third-purple row align-items-center">
      <div className="container-big row justify-between">
        <div className="col-4">
          <h2>Create an account with connected to your coach</h2>
        </div>
          <div className="col-7">
            <h3 className="clr-purple">Register</h3>
            <RegisterClient/>
          </div>
          </div>
          </section>
    
    )
  }

  return (
    <section className="third-purple row align-items-center">
      <div className="container-big row justify-between">
        <div className="col-4">
          <h2>A few clicks from connecting smoothly with your clients</h2>
        </div>
        {url === "/signin" ? (
          <div className="col-7">
            <h3 className="clr-purple">Sign in</h3>
            <SignInForm checkLoggedIn={props.checkLoggedIn} />
            <p className="p-t-2">
              Don't have an account?{" "}
              <a href="#" className="form-link">
                Register
              </a>
            </p>
          </div>
        ) : (
          <div className="col-7">
            <h3 className="clr-purple">Register</h3>
            <p>Let’s get you all set up so you can verify your personal account and begin setting up your profile.</p>
            <RegisterForm checkLoggedIn={props.checkLoggedIn}/>
            <p className="p-t-2">
              Already have an account?{" "}
              <a href="#" className="form-link">
                Sign in
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
