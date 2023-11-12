'use client';
import Button from '@components/UI/Forms/Button';
import Input from '@components/UI/Forms/Input';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ForgotPasswordPayload } from '@types';
import ForgotPasswordSchema from './forgotPassword.schema';
import { useResetPassword } from '@hooks/mutations/useAuth';

const ForgotPassword = () => {
  const { resetPassword, resetPasswordState } = useResetPassword();

  const formik = useFormik<ForgotPasswordPayload>({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => resetPassword(values),
  });

  const isDisabled =
    formik.values.email === '' ||
    Object.keys(formik.errors).length > 0 ||
    resetPasswordState.isPending;

  return (
    <div className='mx-auto w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
          <div className='w-full max-w-md space-y-8'>
            <div className='flex items-center justify-center'>
              <Image
                src='/images/Logo/Logo.svg'
                alt='logo'
                width={46}
                height={46}
              />
              <Link href='/' className='text-2xl font-semibold text-black ml-4'>
                Recipeshive
              </Link>
            </div>
            <h2 className='mt-10 text-center text-3xl font-bold tracking-tight text-gray-800'>
              Forgot your password?
            </h2>
            <form
              className='mt-8 space-y-6'
              onSubmit={(event) => {
                event.preventDefault();
                formik.handleSubmit(event);
              }}
            >
              <Input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label='Email address'
                placeholder='Enter your email address'
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                errorMsg={formik.errors.email}
              />

              <div className='pt-4'>
                <Button
                  colorScheme='primary'
                  type='submit'
                  disabled={isDisabled}
                  className='group relative flex w-full justify-center'
                >
                  <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                    {isDisabled ? (
                      <LockClosedIcon
                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                        aria-hidden='true'
                      />
                    ) : (
                      <LockOpenIcon
                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                        aria-hidden='true'
                      />
                    )}
                  </span>
                  Next
                </Button>
                <p className='text-center pt-4'>
                  Don&apos;t have an account?{' '}
                  <Link href='/signup' className='text-primary-500'>
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
