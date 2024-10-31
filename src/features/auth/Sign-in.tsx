import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";

// Define types for the context value
interface AccountContextType {
  switchToSignup: () => void;
}

// Component Props (if any; currently unused)
interface LoginFormProps {}

// LoginForm Component
export const LoginForm: React.FC<LoginFormProps> = () => {
  const { switchToSignup } = useContext(AccountContext) as AccountContextType;

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
};

// import React, { useState, ChangeEvent, FormEvent } from "react";

// // Define the shape of the form state
// interface FormState {
//   email: string;
//   password: string;
// }

// function SignInForm() {
//   // Initialize state with a type-safe useState hook
//   const [state, setState] = useState<FormState>({
//     email: "",
//     password: "",
//   });

//   // Handle input changes with type-safe event
//   const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = evt.target;
//     setState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission with type-safe event
//   const handleOnSubmit = (evt: FormEvent<HTMLFormElement>) => {
//     evt.preventDefault();
//     const { email, password } = state;

//     alert(`You are logged in with email: ${email} and password: ${password}`);

//     // Clear the form fields
//     setState({
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <div className="form-container sign-in-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Sign in</h1>
//         <div className="social-container">
//           <a href="#" className="social">
//             <i className="fab fa-facebook-f" />
//           </a>
//           <a href="#" className="social">
//             <i className="fab fa-google-plus-g" />
//           </a>
//           <a href="#" className="social">
//             <i className="fab fa-linkedin-in" />
//           </a>
//         </div>
//         <span>or use your account</span>
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <a href="#">Forgot your password?</a>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;
