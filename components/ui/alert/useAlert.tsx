import { useContext } from "react";
import { AlertContext } from "./LuggleAlertProvider";

interface Content {
  title: string;
  message: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  secondaryButton?: boolean;
}

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (context === undefined) {
    throw new Error("Should render inside LuggleAlertProvider component");
  }

  const callInfoAlert = (content: Content) => {
    context.setAlertProps({
      ...content,
      visible: true,
      type: "info",
    });
  };

  const callSuccessAlert = (content: Content) => {
    context.setAlertProps({
      ...content,
      visible: true,
      type: "success",
    });
  };

  const callErrorAlert = (content: Content) => {
    context.setAlertProps({
      ...content,
      visible: true,
      type: "error",
    });
  };

  const callWarningAlert = (content: Content) => {
    context.setAlertProps({
      ...content,
      visible: true,
      type: "warning",
    });
  };

  return {
    info: callInfoAlert,
    success: callSuccessAlert,
    warning: callWarningAlert,
    error: callErrorAlert,
    close: context.close,
  };
};
