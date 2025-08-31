import React from 'react';

import cn from '~/lib/cn';

const buttonVariants = {
  primary: 'bg-primary text-white text-base font-semibold hover:opacity-80 min-w-[100px] p-2 rounded',
  outlined: 'bg-white text-primary border border-primary p-2 rounded',
  icon: 'w-content h-content p-2',
  link: 'w-content h-content underline hover:text-foreground text-primary',
};

const buttonSizes = {
  sm: 'text-sm py-1 px-2',
  md: 'text-base py-2 px-4',
  lg: 'text-lg py-3 px-6',
};

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant;
  size: ButtonSize;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  href?: never;
  target?: never;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  onClick?: never;
  loading?: never;
};

export type AppButtonProps = ButtonProps | AnchorProps;

const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}) => {
  const buttonStyles = cn(
    'cursor-pointer transition-all ease-in-out duration-200 active:scale-95 hover:brightness-95',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  );

  const buttonContent = (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  if ('href' in rest) {
    return (
      <a
        href={rest.href}
        className={buttonStyles}
        target={rest.target ?? '_blank'}
        rel={rest.rel ?? 'noopener noreferrer'}
      >
        {buttonContent}
      </a>
    );
  }

  const { onClick, loading, disabled, ...buttonProps } = rest as ButtonProps;

  return (
    <button disabled={disabled || loading} className={buttonStyles} onClick={onClick} {...buttonProps}>
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        buttonContent
      )}
    </button>
  );
};

export default AppButton;
