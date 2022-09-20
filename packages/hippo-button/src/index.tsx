import { useComponentInTheme } from '@hippo/theme-provider';
import * as React from 'react';

type HTMLButtonProps = React.ComponentPropsWithoutRef<'button'>;
type HTMLButtonRef = React.ElementRef<'button'>;

export interface ButtonProps extends HTMLButtonProps {
  children: React.ReactNode;
}

const COMPONENT_NAME = 'HippoButton';

export const Button = React.forwardRef<HTMLButtonRef, ButtonProps>(
  (props: ButtonProps, forwardedRef: React.ForwardedRef<HTMLButtonRef>) => {
    const { children, type, ...passThroughProps } = props;
    const { componentTheme, isHighlighted } =
      useComponentInTheme(COMPONENT_NAME);

    return (
      <button
        ref={forwardedRef}
        type={type ?? 'button'}
        {...passThroughProps}
        style={{
          cursor: 'pointer',
          backgroundColor: isHighlighted
            ? 'Yellow'
            : componentTheme.colors.primary,
          borderRadius: componentTheme.borderRadiuses.normal,
          borderWidth: componentTheme.borderWidths.none,
          color: componentTheme.colors.text,
          fontSize: componentTheme.fontSizes.base.fontSize,
          lineHeight: componentTheme.fontSizes.base.lineHeight,
          paddingBottom: componentTheme.paddings.small,
          paddingLeft: componentTheme.paddings.medium,
          paddingRight: componentTheme.paddings.medium,
          paddingTop: componentTheme.paddings.small,
        }}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = COMPONENT_NAME;
