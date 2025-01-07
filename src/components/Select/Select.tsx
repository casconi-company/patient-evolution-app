"use client";

import { useEffect, useRef } from "react";
import { InputProps } from "../Input/Input";
import { ArrowDownIcon } from "../icons";

interface SelectProps
  extends Pick<
    InputProps,
    | "onChange"
    | "value"
    | "label"
    | "error"
    | "message"
    | "placeholder"
    | "register"
    | "name"
  > {
  options: Array<OptionProp>;
  isModal?: boolean;
}

const Select = ({
  label,
  onChange,
  value,
  error,
  placeholder,
  name,
  register,
  options,
  message,
  isModal,
}: SelectProps) => {
  const selectRef = useRef<HTMLSelectElement>();

  const handleSelectOption = (event?: any) => {
    onChange?.(event.target.value);
  };

  const openSelect = () => {
    const selectElement = document.getElementById("select-option");
    if (selectElement) {
      selectElement.focus();

      const event = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      selectElement.dispatchEvent(event);
    }
  };

  return (
    <div className="relative h-auto w-full">
      <label
        className={`text-base font-medium leading-4 mb-1 ${
          !!error ? `text-negative-100` : `text-gray-50`
        }`}
      >
        {label}
      </label>
      <select
        id="select-option"
        onChange={handleSelectOption}
        defaultValue={value}
        {...register(name)}
        className={`block w-full cursor-pointer rounded-lg border bg-primary p-3 text-white  focus:outline-transparent focus:outline-0 ${
          !!error
            ? `border-negative-100 focus:border-negative-100`
            : `border-gray-50 focus:border-secondary`
        }`}
      >
        <option value="" disabled selected hidden className="text-zinc-800">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.id}
            className="mt-2 cursor-pointer"
            value={option.id}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div
        className={`absolute right-4 transform ${
          error ? "top-[35%]" : "top-[50%]"
        }  ${
          isModal ? "-translate-y-1/2" : "translate-y-0"
        } z-10 cursor-pointer`}
        onClick={openSelect}
      >
        <ArrowDownIcon />
      </div>
      {!!message && (
        <p
          className={`mt-1 w-full text-base font-normal leading-4 ${
            !!error ? `text-negative-100` : `text-gray-50`
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Select;
