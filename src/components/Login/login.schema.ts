import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
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

export default LoginSchema;
