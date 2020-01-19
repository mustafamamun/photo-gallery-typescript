import React from "react";
import { Button } from "react-bootstrap";
import { ButtonProps } from "../../types/types";

const ButtonComponent: React.FC<ButtonProps> = ({
  className,
  onSelect,
  isActive = false,
  text
}) => {
  return (
    <Button
      className={className}
      variant={"outline-dark"}
      onClick={onSelect}
      active={isActive}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
