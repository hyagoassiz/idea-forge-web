import { ChangeEventHandler } from "react";

export interface SearchProps {
  placeholder: string;
  value: string | number;
  open: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleOpen: () => void;
  handleClose: () => void;
}
