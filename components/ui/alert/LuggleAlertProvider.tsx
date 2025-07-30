import { createContext, useState } from "react";
import LuggleAlert, { AlertProps } from "./LuggleAlert";

interface Props {
  children?: React.ReactNode;
}

interface Actions {
  setAlertProps: (props: AlertProps) => void;
  close: () => void;
}

export const AlertContext = createContext<Actions | undefined>(undefined);

export const LuggleAlertProvider = ({ children }: Props) => {
  const [props, setProps] = useState<AlertProps>({} as AlertProps);

  const setAlertProps = (alertProps: AlertProps) => {
    setProps({ ...alertProps });
  };

  const close = () => {
    setProps((prevState) => ({ ...prevState, visible: false }));
  };

  return (
    <AlertContext.Provider value={{ setAlertProps, close }}>
      {children}
      <LuggleAlert {...props} close={close} />
    </AlertContext.Provider>
  );
};
