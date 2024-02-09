import React from "react";

import IconButton from "@mui/material/IconButton";
import IconRenderer from "./IconRenderer";

import { IButtonPassedProps } from "../../types/Button.types";

const ButtonComponent = (props: IButtonPassedProps) => {
  const { disabled = false, icon, color, onClick } = props;

  return (
    <IconButton aria-label="delete" disabled={disabled} onClick={onClick}>
      <IconRenderer icon={icon} color={color} />
    </IconButton>
  );
};

export default ButtonComponent;
