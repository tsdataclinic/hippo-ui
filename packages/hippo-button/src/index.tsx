import * as React from "react";

type HTMLButtonProps = React.ComponentPropsWithoutRef<"button">;
type HTMLButtonRef = React.ElementRef<"button">;

export interface ButtonProps extends HTMLButtonProps {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonRef, ButtonProps>(
  (props: ButtonProps, forwardedRef: React.ForwardedRef<HTMLButtonRef>) => {
    const { children, ...passThroughProps } = props;
    return (
      <button ref={forwardedRef} {...passThroughProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
