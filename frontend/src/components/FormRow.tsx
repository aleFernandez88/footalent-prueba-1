"use client";

import React, { ReactElement } from "react";

interface FormRowProps {
  label?: string;
  error?: string;
  expand?: boolean;
  extraClass?: string;
  children: ReactElement<{ id?: string }>;
}

const FormRow: React.FC<FormRowProps> = ({
  label,
  error,
  children,
  expand,
  extraClass = "",
}) => {
  return (
    <div className={` flex flex-col gap-3 ${extraClass}`}>
      {label && (
        <label htmlFor={children.props.id} className=" text-[18px] font-medium">
          {label}
        </label>
      )}

      {children}

      {error && (
        <p className=" text-[#dc143c81] font-bold text-[13px] ">{error}</p>
      )}
    </div>
  );
};

export default FormRow;
