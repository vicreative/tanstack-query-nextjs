import * as Yup from 'yup';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email address'),
});

export default ForgotPasswordSchema;
