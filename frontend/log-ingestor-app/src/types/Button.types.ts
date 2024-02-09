import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IButtonPassedProps {
  icon: IconDefinition;
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  color?: string;
}
