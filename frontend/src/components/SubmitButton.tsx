"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: ReactNode;
  extraClass?: string;
  pendingLabel?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  extraClass = "",
  pendingLabel = "Enviando...",
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={` bg-[#006a71] text-[#f2efe7]  text-[15px] font-bold px-3 py-2 rounded-xl cursor-pointer transition duration-200  hover:opacity-75 ${extraClass}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
