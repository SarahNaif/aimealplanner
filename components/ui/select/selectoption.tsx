"use client";
import * as React from "react";


export interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectOption: React.FC<SelectOptionProps> = ({ children, ...props }) => {
    return (
      <option {...props}>
        {children}
      </option>
    );
  };
  
  SelectOption.displayName = "SelectOption";


export default SelectOption;