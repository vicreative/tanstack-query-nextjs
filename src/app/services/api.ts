import { instance as axios } from '@app/config/axios';
import { handleResponse, handleError } from './response';

const get = (resource: string) => {
  return axios.get(resource).then(handleResponse).catch(handleError);
};

const post = (resource: string, model: object, options: object) => {
  return axios
    .post(resource, model, options)
    .then(handleResponse)
    .catch(handleError);
};

const put = (resource: string, model: object) => {
  return axios.put(resource, model).then(handleResponse).catch(handleError);
};

const patch = (resource: string, model: object) => {
  return axios.patch(resource, model).then(handleResponse).catch(handleError);
};

const remove = (resource: string, id: any) => {
  return axios.delete(resource, id).then(handleResponse).catch(handleError);
};

const exportedObject = {
  get,
  post,
  put,
  patch,
  remove,
};

export default exportedObject;
