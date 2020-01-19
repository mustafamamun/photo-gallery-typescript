import React from "react";
import { Alert } from "react-bootstrap";
import { get } from "lodash";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { ErrorAlertProps } from "../../types/types";
const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onRetry,
  className
}) => {
  return (
    <Alert variant="danger" className={className}>
      <Alert.Heading>
        {get(error, "status", "")}!! {get(error, "message", "")}!!
      </Alert.Heading>
      <p>Please try again later</p>
      <div className="d-flex justify-content-end">
        <ButtonComponent className="" text={"Retry"} onSelect={onRetry} />
      </div>
    </Alert>
  );
};
export default ErrorAlert;
