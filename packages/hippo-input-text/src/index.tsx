import * as React from 'react';
import { useTextField, type AriaTextFieldOptions } from '@react-aria/textfield';
import { ThemeContext } from '@hippo/theme-provider';
import { useComposedRefs } from '@hippo/utils';

type HTMLInputRef = React.ElementRef<'input'>;

export interface InputTextProps extends AriaTextFieldOptions<'input'> {
  /**
   * The value to set for the InputText. If no value is provided, then the
   * InputText is treated as uncontrolled.
   */
  value?: string;
}

const NAME = 'HippoInputText';

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

    const { highlightedComponents, registerComponentName, theme } =
      React.useContext(ThemeContext);

    React.useEffect(() => {
      console.log('Registering ' + NAME);
      registerComponentName(NAME);
    }, []);
    const configs = theme.componentSpecificConfigs[NAME];
    const isHighlighted = new Set(highlightedComponents).has(NAME);

    return (
      <input
        value={value}
        {...passThroughInputProps}
        ref={forwardedRef}
        type="text"
        style={{
          color: theme.color,
          fontSize: theme.fontSize,
          ...configs,
          backgroundColor: isHighlighted ? 'Yellow' : 'inherit',
        }}
      />
    );
  },
);

InputText.displayName = 'InputText';
