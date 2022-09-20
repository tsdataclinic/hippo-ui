import * as React from 'react';
import { useComponentInTheme } from '@hippo/theme-provider';
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

const COMPONENT_NAME = 'HippoInputText';

/**
 * An InputText component.
 * Uncontrolled by default until a `value` is passed.
 */
export const InputText = React.forwardRef<HTMLInputRef, InputTextProps>(
  (props: InputTextProps, forwardedRef: React.ForwardedRef<HTMLInputRef>) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const composedRef = useComposedRefs(forwardedRef, inputRef);
    const { inputProps } = useTextField(props, composedRef);
    const { value, ...passThroughInputProps } = inputProps;

    const { componentTheme, isHighlighted } =
      useComponentInTheme(COMPONENT_NAME);

    return (
      <input
        value={value}
        {...passThroughInputProps}
        ref={forwardedRef}
        type="text"
        style={{
          backgroundColor: isHighlighted
            ? 'Yellow'
            : componentTheme.colors.background,
          borderRadius: componentTheme.borderRadiuses.none,
          borderWidth: componentTheme.borderWidths.soft,
          color: componentTheme.colors.text,
          fontSize: componentTheme.fontSizes.base.fontSize,
          lineHeight: componentTheme.fontSizes.base.lineHeight,
          paddingBottom: componentTheme.paddings.small,
          paddingLeft: componentTheme.paddings.medium,
          paddingRight: componentTheme.paddings.medium,
          paddingTop: componentTheme.paddings.small,
        }}
      />
    );
  },
);

InputText.displayName = COMPONENT_NAME;
