import { createContext, useContext } from "react";

// Define the context type
export interface AccountContextType {
  switchToSignin: () => void;
  switchToSignup: () => void;
}

// Create a context with a default value
const defaultContextValue: AccountContextType = {
  switchToSignin: () => {}, // Default no-op function
  switchToSignup: () => {}, // Default no-op function
};

export const AccountContext =
  createContext<AccountContextType>(defaultContextValue);

// Optional: Create a custom hook for easier access to the context
export const useAccountContext = () => {
  return useContext(AccountContext);
};
