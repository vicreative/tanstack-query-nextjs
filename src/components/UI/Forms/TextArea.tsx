'use client';
import React, { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  value: string;
  className?: string;
  isInvalid?: boolean;
  errorMsg?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const { label, id, className, isInvalid, errorMsg, ...rest } = props;
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <textarea
          ref={ref}
          id={id}
          {...rest}
          className={`${className} ${label ? 'mt-0.5' : ''} ${
            isInvalid
              ? '!border-error-600'
              : 'border-gray-400 border-opacity-50'
          } m-h-100 relative block w-full appearance-none rounded-md border px-3 py-2 text-black placeholder-gray-200 focus:outline-none sm:text-sm'`}
        />
        {isInvalid && (
          <p className='text-error-600 text-sm pt-1.5'>{errorMsg}</p>
        )}
      </div>
    );
  }
);

export default TextArea;

TextArea.displayName = 'TextArea';
