import { useState, useCallback, Dispatch, SetStateAction } from 'react';

type returnType<T = string> = [T, (e: React.ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = string>(initialDate: T): returnType<T> => {
  const [value, setValue] = useState(initialDate);

  const handeler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handeler, setValue];
};

export default useInput;
