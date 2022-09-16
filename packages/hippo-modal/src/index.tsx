import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './index.css';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
  title: string;
}

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
        <Dialog.Content className="hippo-modal__dialog-content">
          <Dialog.Title>{title}</Dialog.Title>
          {children}
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

Modal.displayName = 'Modal';
