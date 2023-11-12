import { contactUs } from '@data/contact';
import { useMutation } from '@tanstack/react-query';
import { MailPayload } from '@types';
import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

/**
 * Hook to Contact us
 * @returns {UserCredential}
 */
function useContactUs() {
  const contactUsRequest = (payload: MailPayload) => contactUs(payload);

  const { mutate, ...mutationState } = useMutation({
    mutationFn: contactUsRequest,
  });

  const contactUsFn = (
    payload: MailPayload,
    onSuccess = (data: AxiosResponse<any, any>) => {},
    onError = (error: Error) => {}
  ) => {
    mutate(payload, {
      onSuccess: (data) => {
        toast.success('Message Sent Successfully!');
        onSuccess(data);
      },
      onError: (error) => {
        toast.error(error.message);
        onError(error);
      },
    });
  };

  return { contactUs: contactUsFn, contactUsState: mutationState };
}

export { useContactUs };
