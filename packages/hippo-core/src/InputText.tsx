export interface InputTextProps {
  value: string;
}

export function InputText({ value }: InputTextProps) {
  return <input type="text" value={value} />;
}

InputText.displayName = "Button";
