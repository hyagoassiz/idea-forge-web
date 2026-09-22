import { SearchProps } from "@/types";
import { ChangeEvent, useRef, useState } from "react";

interface UseSearchProps {
  placeholder?: string;
  debounceTime?: number;
}

interface UseSearchReturn {
  search: SearchProps;
  searchValue: string | undefined;
}

export function useSearch({
  placeholder = "Pesquisar...",
  debounceTime = 500,
}: UseSearchProps): UseSearchReturn {
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [value, setValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const newValue = event.target.value;

    setValue(newValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchValue(newValue);
    }, debounceTime);
  }

  function handleClose(): void {
    setOpen(false);
    setValue("");
    setSearchValue(undefined);
  }

  function handleOpen(): void {
    setOpen(true);
  }

  return {
    search: {
      placeholder,
      value,
      open,
      onChange: handleChange,
      handleOpen,
      handleClose,
    },
    searchValue,
  };
}
