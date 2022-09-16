import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styled, { keyframes } from 'styled-components';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
  title: string;
}

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const ModalOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.05);
  position: fixed;
  inset: 0;
  '@media (prefers-reduced-motion: no-preference)': {
    animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1),
  },
`;

const ModalContent = styled(Dialog.Content)`
  background: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  left: 50%;
  maxheight: 85vh;
  maxwidth: 450px;
  padding: 25;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;

  &:focus {
    outline: none;
  }
`;

export function Modal({
  children,
  isOpen,
  onDismiss,
  title,
}: ModalProps): JSX.Element {
  const onOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        onDismiss();
      }
    },
    [onDismiss],
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <ModalOverlay />
        <ModalContent className="testing">
          <Dialog.Title>{title}</Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button>Close</button>
          </Dialog.Close>
        </ModalContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

Modal.displayName = 'Modal';
