import * as React from 'react';

type HTMLButtonProps = React.ComponentPropsWithoutRef<'button'>;
type HTMLButtonRef = React.ElementRef<'button'>;

export interface ButtonProps extends HTMLButtonProps {
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonRef, ButtonProps>(
  (props: ButtonProps, forwardedRef: React.ForwardedRef<HTMLButtonRef>) => {
    const { children, type, ...passThroughProps } = props;
    return (
      <button ref={forwardedRef} type={type ?? 'button'} {...passThroughProps}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
