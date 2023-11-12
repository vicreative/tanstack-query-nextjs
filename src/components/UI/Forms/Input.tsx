'use client';
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  className?: string;
  isInvalid?: boolean;
  errorMsg?: string;
  isDisabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, id, className, isInvalid, errorMsg, isDisabled, ...rest } =
    props;
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        ref={ref}
        id={id}
        disabled={isDisabled}
        {...rest}
        className={`${className} ${label ? 'mt-0.5' : ''} ${
          isDisabled ? 'cursor-not-allowed' : ''
        } ${
          isInvalid ? '!border-error-600' : 'border-gray-400 border-opacity-50'
        } relative block w-full appearance-none rounded-md border px-3 py-2 text-black placeholder-gray-200 focus:outline-none sm:text-sm'`}
      />
      {isInvalid && <p className='text-error-600 text-sm pt-1.5'>{errorMsg}</p>}
    </div>
  );
});

export default Input;

Input.displayName = 'Input';
