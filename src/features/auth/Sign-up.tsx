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
import { AccountContextType, AccountContext } from "./accountContext";

// Define the component
export const SignupForm: React.FC = () => {
  const { switchToSignin } = useContext<AccountContextType>(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
};

// import React, { useState, ChangeEvent, FormEvent } from "react";

// // Define the shape of the form state
// interface FormState {
//   name: string;
//   email: string;
//   password: string;
// }

// function SignUpForm() {
//   // Initialize state with a type-safe useState hook
//   const [state, setState] = useState<FormState>({
//     name: "",
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
//     const { name, email, password } = state;

//     alert(
//       `You are signed up with name: ${name}, email: ${email}, and password: ${password}`
//     );

//     // Clear the form fields
//     setState({
//       name: "",
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Create Account</h1>
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
//         <span>or use your email for registration</span>
//         <input
//           type="text"
//           name="name"
//           value={state.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
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
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default SignUpForm;
