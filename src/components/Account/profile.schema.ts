import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('Firstname')
    .required('Firstname should not be empty')
    .min(2, 'Must have at least 2 characters')
    .max(20, 'Must not have more than 20 characters'),
  lastName: Yup.string()
    .label('Lastname')
    .required('Lastname should not be empty')
    .min(2, 'Must have at least 2 characters')
    .max(20, 'Must not have more than 20 characters'),
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email address'),
  photoURL: Yup.string().label('Photo Url'),
});

export default ProfileSchema;
