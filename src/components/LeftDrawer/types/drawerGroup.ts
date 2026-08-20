import { ReactNode } from "react";

export type DrawerGroup = {
  title: string;
  options: DrawerOption[];
};

type DrawerOption = {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
};
