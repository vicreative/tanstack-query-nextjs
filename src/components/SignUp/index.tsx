'use client';
import React from 'react';
import Button from '@components/UI/Forms/Button';
import Input from '@components/UI/Forms/Input';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useFormik } from 'formik';
import SignupSchema from './signup.schema';
import { CreateUserPayload } from '@types';
import GoogleIcon from '@assets/Svgs/GoogleIcon';
import { useCreateUser, useSigninWithGoogle } from '@hooks/mutations/useAuth';

const SignUp = () => {
  const { signIn, signInState } = useSigninWithGoogle();
  const { createUser, createUserState } = useCreateUser();

  const formik = useFormik<CreateUserPayload>({
    initialValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => createUser(values),
  });

  const handleSignUpWithGoogle = () => {
    signIn({ isSignUp: true });
  };

  const isDisabled =
    Object.values(formik.values).some((value) => value === '') ||
    Object.keys(formik.errors).length > 0 ||
    signInState.isPending ||
    createUserState.isPending;

  return (
    <div className='mx-auto w-full h-screen flex items-center justify-center'>
      <div className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
        <div className='flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8'>
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
              Create an account
            </h2>

            <Button
              className='w-full flex justify-center items-center'
              variant='outline'
              colorScheme='black'
              onClick={handleSignUpWithGoogle}
            >
              <GoogleIcon className='mr-2' width={20} height={20} /> Signup with
              Google
            </Button>

            {/* Divider */}
            <div className='relative'>
              <div
                className='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div className='w-full border-t border-gray-100' />
              </div>
              <div className='relative flex justify-center text-sm font-medium leading-6'>
                <span className='bg-white px-6 text-gray-900'>Or</span>
              </div>
            </div>

            <form
              className='mt-8 space-y-6'
              onSubmit={(event) => {
                event.preventDefault();
                formik.handleSubmit(event);
              }}
            >
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-x-3'>
                  <Input
                    required
                    id='firstName'
                    name='firstName'
                    type='text'
                    autoComplete='given-name'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label='Firstname'
                    placeholder='Enter your firstname'
                    isInvalid={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    errorMsg={formik.errors.firstName}
                  />
                  <Input
                    required
                    id='lastName'
                    name='lastName'
                    type='text'
                    autoComplete='family-name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label='Lastname'
                    placeholder='Enter your lastname'
                    isInvalid={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    errorMsg={formik.errors.lastName}
                  />
                </div>

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
                  isInvalid={
                    formik.touched.email && Boolean(formik.errors.email)
                  }
                  errorMsg={formik.errors.email}
                />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='new-password'
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label='Password'
                  placeholder='Enter your password'
                  isInvalid={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  errorMsg={formik.errors.password}
                />
              </div>

              <div className='pt-3'>
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
                  Sign up
                </Button>
                <p className='text-center pt-4'>
                  Already have an account?{' '}
                  <Link href='login' className='text-primary-500'>
                    Login
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

export default SignUp;
