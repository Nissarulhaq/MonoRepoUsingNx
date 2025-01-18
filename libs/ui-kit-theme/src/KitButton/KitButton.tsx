import React from 'react';
import { Button, ButtonProps } from '@ui-kitten/components';

interface KitButtonProps extends Omit<ButtonProps, 'children'> {
  title?: string;
  children?: React.ReactNode;
}

const KitButton: React.FC<KitButtonProps> = ({
  title,
  children,
  appearance = 'filled',
  size = 'medium',
  status = 'primary',
  ...props
}) => {
  return (
    <Button
      appearance={appearance}
      size={size}
      status={status}
      {...props}
    >
      {(children || title)?.toString()}
    </Button>
  );
};

export default KitButton;