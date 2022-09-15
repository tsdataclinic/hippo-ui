import * as React from 'react';

type HTMLInputProps = React.ComponentPropsWithoutRef<'input'>;
type HTMLInputRef = React.ElementRef<'input'>;

export interface InputTextProps extends HTMLInputProps {
  value: string;
}

export const InputText = React.forwardRef<HTMLInputRef, InputTextProps>(
  (props: InputTextProps, forwardedRef: React.ForwardedRef<HTMLInputRef>) => {
    const { value, ...passThroughProps } = props;
    return (
      <input
        ref={forwardedRef}
        type="text"
        value={value}
        {...passThroughProps}
      />
    );
  },
);

InputText.displayName = 'InputText';
