import { useNavigate } from "react-router";
import { ICoach } from "../../App";
import { auth } from "../../firebase-config";
import Logo from "./../../img/Logo.svg";

interface IHeaderProps {
  url: string;
  checkLoggedIn(): void;
  checkUrl(): void;
  coach: ICoach | undefined
}
export const Header = (props: IHeaderProps) => {
  const navigate = useNavigate(); 

  const userLoggedIn = auth.currentUser

  const signOut = async () => {
    await auth.signOut()
    props.checkLoggedIn()
  }

  return (
 
    <nav className={"row " + props.url}>
      <div className="col-6">
        <img src={Logo} onClick={() => {navigate("/"); props.checkUrl()}} />
      </div>
      <div className="col-6 row justify-end">
        <ul className="row">
          {userLoggedIn !== null ? (
            <li>
              <a onClick={signOut} tabIndex={1} onKeyPressCapture={signOut}>Sign out</a>
            </li>
          ) : (
            <>
             <li>
            <a tabIndex={1} href="/register">Sign up</a>
          </li>
           <li>
           <a tabIndex={2} href="/signin">Sign in</a>
         </li>
            </>
           
          )}
          
        </ul>
      </div>
    </nav>
  );
};
