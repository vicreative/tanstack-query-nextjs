'use client';
import React, { ChangeEvent, useState } from 'react';
import { uploadToStorageBucket } from '@data/storage';
import { useUser } from '@hooks/context/useUser';
import { useUpdateUser } from '@hooks/mutations/useAuth';
import Button from '@components/UI/Forms/Button';
import Link from 'next/link';
import Upload from '@components/UI/Forms/Upload';
import { toast } from 'react-hot-toast';
import { FiEdit2 } from 'react-icons/fi';
import ProfileSchema from './profile.schema';
import { useFormik } from 'formik';
import { UserProfilePayload } from '@types';
import Input from '@components/UI/Forms/Input';

const Account = () => {
  const {
    state: { user },
  } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { updateUser, updateUserState } = useUpdateUser();

  const initialState = {
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ')[1] || '',
  };

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && user) {
      const file = e.target.files[0];
      const metadata = { contentType: file.type };
      const type = file.type.split('/')[0];
      const fileNameSufix = file.name.split('.')[1];
      const filePath = `${type}s/${user.uid}/profileImage.${fileNameSufix}`;

      if (type !== 'image') {
        toast.error('Invalid file selected. Please select an image');
      } else {
        const onProgressUpdate = (progress: number) => {
          setUploadProgress(progress);
        };

        const onSuccess = (downloadURL: string) => {
          formik.setFieldValue('photoURL', downloadURL, true);
          setUploadProgress(0);
        };

        uploadToStorageBucket({
          file,
          filePath,
          metadata,
          onSuccess,
          onProgressUpdate,
        });
      }
    }
  };

  const onCancel = () => {
    setIsEditMode(false);
    formik.setValues(initialState);
  };

  const handleSubmit = (values: UserProfilePayload) => {
    if (user) {
      const payload = {
        user,
        displayName: `${values.firstName} ${values.lastName}`,
        photoURL: values.photoURL,
      };

      const onSuccess = () => {
        setIsEditMode(false);
      };

      updateUser(payload, onSuccess);
    }
  };

  const formik = useFormik<UserProfilePayload>({
    initialValues: initialState,
    validationSchema: ProfileSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div className='mx-auto max-w-4xl lg:pt-20 sm:pb-24 px-6'>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          formik.handleSubmit(event);
        }}
      >
        <div className='grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 divide-x-0 md:divide-x bg-white rounded-xl shadow-md py-16 px-14'>
          {/* Left/Top */}
          <div className='md:col-span-4 pb-8 md:pb-0 md:pr-8'>
            <Upload
              id='profileImage'
              accept='image/*'
              isDisabled={!isEditMode}
              uploadProgress={uploadProgress}
              value={formik.values.photoURL}
              onChange={handleProfileImageChange}
            />

            <h2 className='text-2xl md:text-3xl pt-4 pb-10'>{`Welcome, ${formik.values.firstName}`}</h2>
            <Link href='/saved-recipes'>
              <Button variant='outline' colorScheme='black'>
                Manage Saved Recipes
              </Button>
            </Link>
            {user?.metadata.creationTime && (
              <p className='pt-4 text-gray-500'>{`Joined in ${new Date(
                user?.metadata.creationTime
              ).getFullYear()}`}</p>
            )}
          </div>
          {/* Right/Bottom */}
          <div className='sm:col-span-8 pt-8 md:pt-0 md:pl-8 space-y-4'>
            {/* Firstname */}
            {isEditMode ? (
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
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                errorMsg={formik.errors.firstName}
              />
            ) : (
              <div>
                <h3 className='text-lg md:text-xl text-gray-600'>Firstname</h3>
                <p className='text-xl md:text-2xl pt-1 font-medium'>
                  {formik.values.firstName}
                </p>
              </div>
            )}

            {/* Lastname */}
            {isEditMode ? (
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
            ) : (
              <div>
                <h3 className='text-lg md:text-xl text-gray-600'>LastName</h3>
                <p className='text-xl md:text-2xl pt-1 font-medium'>
                  {formik.values.lastName}
                </p>
              </div>
            )}

            {/* Email */}
            {isEditMode ? (
              <Input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                isDisabled
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label='Email address'
                placeholder='Enter your email address'
                isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                errorMsg={formik.errors.email}
              />
            ) : (
              <div>
                <h3 className='text-lg md:text-xl text-gray-600'>Email</h3>
                <p className='text-xl md:text-2xl pt-1 font-medium'>
                  {formik.values.email}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className='pt-8 flex w-full justify-end'>
              {!isEditMode && (
                <Button
                  className='flex items-center justify-center gap-2 min-w-100'
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                  <FiEdit2 />
                </Button>
              )}

              {isEditMode && (
                <div className='flex items-center justify-center gap-4'>
                  <Button
                    className='min-w-100'
                    variant='outline'
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className='min-w-100'
                    type='submit'
                    disabled={updateUserState.isPending || uploadProgress > 0}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
