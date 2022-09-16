import { ThemeContext } from '@hippo/theme-provider';
import { useContext, useEffect } from 'react';
import * as React from 'react';

type HTMLButtonProps = React.ComponentPropsWithoutRef<'button'>;
type HTMLButtonRef = React.ElementRef<'button'>;

export interface ButtonProps extends HTMLButtonProps {
  children: React.ReactNode;
}
const NAME = 'HippoButton';
export const Button = React.forwardRef<HTMLButtonRef, ButtonProps>(
  (props: ButtonProps, forwardedRef: React.ForwardedRef<HTMLButtonRef>) => {
    const { children, type, ...passThroughProps } = props;

    const { highlightedComponents, registerComponentName, theme } =
      useContext(ThemeContext);

    useEffect(() => {
      console.log('Registering ' + NAME);
      registerComponentName(NAME);
    }, []);
    const configs = theme.componentSpecificConfigs[NAME];
    const isHighlighted = new Set(highlightedComponents).has(NAME);

    return (
      <button
        ref={forwardedRef}
        type={type ?? 'button'}
        {...passThroughProps}
        style={{
          color: theme.color,
          fontSize: theme.fontSize,
          ...configs,
          backgroundColor: isHighlighted ? 'Yellow' : 'inherit',
        }}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
