'use client';
import Button from '@components/UI/Forms/Button';
import Input from '@components/UI/Forms/Input';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LoginSchema from './login.schema';
import useRouter from '@hooks/useRouter';
import { LoginPayload } from '@types';
import GoogleIcon from '@assets/Svgs/GoogleIcon';
import { useLogin, useSigninWithGoogle } from '@hooks/mutations/useAuth';
import { getStoredPreviousRoute, removePreviousRoute } from '@utils/auth';

const Login = () => {
  const router = useRouter();
  const { login, loginState } = useLogin();
  const { signIn, signInState } = useSigninWithGoogle();
  const previousRoute = getStoredPreviousRoute();

  const onSuccess = () => {
    if (previousRoute) {
      router.push(previousRoute);
      removePreviousRoute();
    } else {
      router.push('/');
    }
  };

  const formik = useFormik<LoginPayload>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => login(values, onSuccess),
  });

  const handleLoginWithGoogle = () => {
    signIn({ isSignUp: false }, onSuccess);
  };

  const isDisabled =
    Object.values(formik.values).some((value) => value === '') ||
    Object.keys(formik.errors).length > 0 ||
    signInState.isPending ||
    loginState.isPending;

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
              Log in to your account
            </h2>

            <Button
              className='w-full flex justify-center items-center'
              variant='outline'
              colorScheme='black'
              onClick={handleLoginWithGoogle}
            >
              <GoogleIcon className='mr-2' width={20} height={20} /> Signin with
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
                  autoComplete='current-password'
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

              <div className='w-full flex justify-end text-sm'>
                <a
                  href='/forgot-password'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Forgot your password?
                </a>
              </div>

              <div>
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
                  Log in
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

export default Login;
