import React from "react";

// @ts-ignore
import Select from "react-select-virtualized";

import { IDropDownPassedProps } from "../../types/DropDown.types";

import "../../styles/DropDown.css";

const DropDown = (props: IDropDownPassedProps) => {
  const { value, menu, label, onSelect } = props;

  return (
    <div className="dropdown-container">
      <div className="label">{label}</div>
      <Select
        value={value}
        options={menu}
        onChange={onSelect}
        menuPosition="top"
      />
    </div>
  );
};

export default DropDown;
