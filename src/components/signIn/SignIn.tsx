import { SignInForm } from "./SignInForm"

export interface ISignProps {
    checkCookie(): void;
}
export const SignIn= (props: ISignProps) => {
    return(
        <section className="third-purple row align-items-center">
           <div className="container-big row justify-between">
            <div className="col-4">
                <h2>A few clicks from connecting smoothly with your clients</h2>
            </div>
            <div className="col-7">
                <h3 className="clr-purple">Sign in</h3>
                <SignInForm checkCookie={props.checkCookie}/>
                <p className="p-t-2">Don't have an account? <a href="#" className="form-link">Register</a></p>
            </div>
           </div>
        </section>
    )
}
