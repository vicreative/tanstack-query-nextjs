import * as Yup from 'yup';

const ContactUsSchema = Yup.object().shape({
  senderName: Yup.string()
    .label('Name')
    .required('Name should not be empty')
    .min(2, 'Must have at least 2 characters')
    .max(20, 'Must not have more than 20 characters'),
  senderEmail: Yup.string()
    .label('Email')
    .required('Email is required')
    .email('Enter a valid email address'),
  subject: Yup.string()
    .label('Subject')
    .required('Subject is required')
    .min(10, 'Must have at least 10 characters'),
  message: Yup.string()
    .label('Message')
    .required('Message should not be empty')
    .min(20, 'Must have at least 20 characters'),
});

export default ContactUsSchema;
