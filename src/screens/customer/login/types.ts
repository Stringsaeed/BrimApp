import { Control } from "react-hook-form";

export interface LoginViewProps {
  isSubmitDisabled: boolean;
  onSubmit: () => void;
  control: Control<{
    phoneNumber: string;
    country: string;
  }>;
}
