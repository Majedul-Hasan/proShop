import React from "react";
import { Alert } from "react-bootstrap";

const ErrorAlerat = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

ErrorAlerat.defaultProps = {
  variant: "info",
};

export default ErrorAlerat;
