import { useState } from 'react';

interface InputProps {
  val: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

/**
 * @function  custom hook of input
 * @param initialValue
 */
const useInput = (initialValue: string): InputProps => {
  const [val, setVal] = useState<string>(initialValue);
  const setDoubleValue = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ): void => {
    setVal(e.target.value);
  };
  return {
    val,
    onChange: setDoubleValue,
  };
};

export default useInput;
