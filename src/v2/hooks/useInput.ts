import { useCallback, useState } from "react";

const useInput = (
  initialValue: string
): [string, React.ChangeEventHandler<HTMLInputElement>, () => void] => {
  const [value, setValue] = useState(initialValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    []
  );

  const clear = useCallback(() => {
    setValue("");
  }, []);

  return [value, handleChange, clear];
};

export { useInput };
