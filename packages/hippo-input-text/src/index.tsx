import * as React from 'react';
import { useTextField, type AriaTextFieldOptions } from '@react-aria/textfield';
import { useComposedRefs } from '@hippo/utils';

type HTMLInputRef = React.ElementRef<'input'>;

export interface InputTextProps extends AriaTextFieldOptions<'input'> {
  /**
   * The value to set for the InputText. If no value is provided, then the
   * InputText is treated as uncontrolled.
   */
  value?: string;
}

/**
 * An InputText component.
 * Is uncontrolled by default until a `value` is passed.
 */
export const InputText = React.forwardRef<HTMLInputRef, InputTextProps>(
  (props: InputTextProps, forwardedRef: React.ForwardedRef<HTMLInputRef>) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const composedRef = useComposedRefs(forwardedRef, inputRef);
    const { inputProps } = useTextField(props, composedRef);
    const { value, ...passThroughInputProps } = inputProps;
    return <input {...passThroughInputProps} ref={forwardedRef} type="text" />;
  },
);

InputText.displayName = 'InputText';
