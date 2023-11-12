import { resolveSizes, resolveButtonVariants } from '@utils/resolveClassNames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'outline' | 'accent' | 'naked' | 'link';
  colorScheme?: 'primary' | 'secondary' | 'chimney' | 'black';
  rounded?: boolean;
  isIcon?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    id = 'button',
    type = 'button',
    variant = 'filled',
    colorScheme = 'primary',
    rounded = true,
    isIcon = false,
    className = '',
    size = 'md',
    children,
    ...rest
  } = props;

  const classNames = `${className} btn ${resolveButtonVariants(
    variant,
    colorScheme
  )} ${resolveSizes(size, isIcon)} ${rounded ? 'rounded-full' : 'rounded'}`;

  return (
    <button className={classNames} ref={ref} id={id} type={type} {...rest}>
      {children}
    </button>
  );
});

export default Button;
Button.displayName = 'Button';
