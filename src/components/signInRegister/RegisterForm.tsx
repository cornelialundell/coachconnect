import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { IUser } from "./SignInForm";
import { ISignProps } from "./SignInRegister";


export const RegisterForm = (props: ISignProps) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState<string | undefined>('')
    const [user, setUser] = useState<IUser>()

    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resp = await createUserWithEmailAndPassword(auth, email, password);
            setToken(await auth.currentUser?.getIdToken())

            setUser({
                email: resp.user.email,
                token: token
            }
            )
        } catch (error) {console.log(error)}
        navigate("/");
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        cookies.set("Authorization", token)
        props.checkCookie();
    },[user])

    return(
        <form className="row justify-between" onSubmit={(e) => register(e)}>
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
        Sign up
      </button>
    </form>
    )
}