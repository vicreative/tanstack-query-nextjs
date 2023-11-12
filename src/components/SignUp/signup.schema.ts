import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
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
  password: Yup.string()
    .label('Password')
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(256, 'Password must not exceed 256 characters'),
});

export default SignupSchema;
