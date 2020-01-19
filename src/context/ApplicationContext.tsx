import { createContext } from "react";
import { ContextValues } from "../types/types";
const appContext: ContextValues = {
  setIsLoading: (value: boolean) => {},
  isLoading: false
};
const ApplicationContext = createContext<ContextValues>(appContext);
export const ApplicationContextProvider = ApplicationContext.Provider;
export const ApplicationContextConsumer = ApplicationContext.Consumer;
export default ApplicationContext;
