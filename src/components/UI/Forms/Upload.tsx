import React from 'react';
import { CameraIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type UploadProps = {
  id: string;
  label?: string;
  value?: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  uploadProgress?: number;
};

const Upload = ({
  id,
  label,
  value,
  accept,
  onChange,
  isDisabled,
  uploadProgress = 0,
  ...rest
}: UploadProps) => {
  return (
    <div className='flex relative'>
      <input
        className='hidden'
        disabled={uploadProgress > 0 || isDisabled}
        type='file'
        accept={accept}
        id={id}
        onChange={onChange}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className='flex relative bg-primary-100 rounded-full'>
          {value ? (
            <Image
              src={value}
              alt='Image'
              className='w-24 h-24 rounded-full'
              width={40}
              height={40}
            />
          ) : (
            <div className='flex items-center justify-center w-24 h-24 rounded-full'>
              <CameraIcon className='w-10 h-10 text-primary-500' />
            </div>
          )}

          {uploadProgress > 0 && (
            <div className='flex items-center justify-center rounded-full w-full h-full absolute bg-bordertop'>
              <p className='text-white'>{uploadProgress}%</p>
            </div>
          )}
        </div>
        {label && <p className='pt-2'>{label}</p>}
      </label>
    </div>
  );
};

export default Upload;
