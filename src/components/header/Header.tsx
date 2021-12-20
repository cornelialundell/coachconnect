import { useEffect, useState } from "react";
import Logo from "./../../img/Logo.svg";

export const Header = () => {
  let [url, setUrl] = useState('')

  useEffect(() => {
    let currUrl = window.location.pathname;
    if( currUrl.charAt( 0 ) === '/' ){
      currUrl = currUrl.slice( 1 );
    }
    setUrl(currUrl)
  },[url])

  return (

    <nav className={"row " + url} >
      <div className="col-6">
        <img src={Logo} />
      </div>
      <div className="col-6 row justify-end">
          <ul className="row">
              <li>
                  <a>Sign up</a>
              </li>
              <li>
                  <a>About</a>
              </li>
              <li>
                  <a>Pricing</a>
              </li>
          </ul>
      </div>
    </nav>
  );
};
