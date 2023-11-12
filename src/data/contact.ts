import { MailPayload } from '@types';
import axios from 'axios';

export async function contactUs(payload: MailPayload) {
  const response = await axios.post('/api/contact', payload);

  return response.data;
}
