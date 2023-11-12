'use client';
import Button from '@components/UI/Forms/Button';
import Input from '@components/UI/Forms/Input';
import { MailPayload } from '@types';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ContactUsSchema from './contactus.schema';
import { useContactUs } from '@hooks/mutations/useContactUs';
import TextArea from '@components/UI/Forms/TextArea';

const ContactUs = () => {
  const { contactUs, contactUsState } = useContactUs();

  const formik = useFormik<MailPayload>({
    initialValues: {
      message: '',
      subject: '',
      senderName: '',
      senderEmail: '',
      receiverEmail: 'allrecipeshive@gmail.com',
    },
    validationSchema: ContactUsSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        message: `<p>Hello,</p>
          <p>${values.message}</p>
          <p>You can contact me at ${values.senderEmail}</p>
          <p>Thanks,</p>
          <p>${values.senderName}</p>`,
      };
      contactUs(payload);
    },
  });

  const isDisabled =
    Object.values(formik.values).some((value) => value === '') ||
    Object.keys(formik.errors).length > 0 ||
    contactUsState.isPending;

  return (
    <div className='flex h-screen w-full'>
      <div className='flex w-full md:w-1/2 overflow-scroll flex-col justify-center py-12 px-6 md:flex-none'>
        <div className='mx-auto h-full w-full max-w-sm'>
          <div className='flex items-center'>
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

          <h2 className='mt-12 text-2xl font-bold leading-9 tracking-tight'>
            Get in touch with us
          </h2>
          <p className='mb-6 mt-2 text-700'>
            Contact us for questions, feedback, or collaborations. We&apos;re
            here to assist you on your culinary journey.
          </p>
          <form
            className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault();
              formik.handleSubmit(event);
            }}
          >
            <Input
              required
              id='subject'
              name='subject'
              type='text'
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Subject'
              placeholder='Enter the subject of your message here'
              isInvalid={
                formik.touched.subject && Boolean(formik.errors.subject)
              }
              errorMsg={formik.errors.subject}
            />
            <Input
              required
              id='senderName'
              name='senderName'
              type='text'
              autoComplete='name'
              value={formik.values.senderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Name'
              placeholder='Enter your name'
              isInvalid={
                formik.touched.senderName && Boolean(formik.errors.senderName)
              }
              errorMsg={formik.errors.senderName}
            />
            <Input
              id='senderEmail'
              name='senderEmail'
              type='email'
              autoComplete='email'
              required
              value={formik.values.senderEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Email address'
              placeholder='Enter your email address'
              isInvalid={
                formik.touched.senderEmail && Boolean(formik.errors.senderEmail)
              }
              errorMsg={formik.errors.senderEmail}
            />
            <TextArea
              id='message'
              name='message'
              className='relative block min-h-100 w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-black placeholder-gray-700 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label='Message'
              placeholder='Enter your message here...'
              isInvalid={
                formik.touched.message && Boolean(formik.errors.message)
              }
              errorMsg={formik.errors.message}
            />
            <div className='pt-4 pb-12'>
              <Button
                type='submit'
                rounded={false}
                className='w-full'
                colorScheme='chimney'
                disabled={isDisabled}
              >
                Send message
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className='relative hidden w-1/2 h-full md:block bg-primary-50'>
        <Image
          className='absolute inset-0 h-full w-full object-cover'
          src='/images/ContactUs/grilled-chicken-steak.jpg'
          alt=''
          width={700}
          height={700}
        />
      </div>
    </div>
  );
};

export default ContactUs;
