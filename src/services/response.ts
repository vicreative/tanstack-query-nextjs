export function handleResponse(response: any) {
  if (response) {
    if (response.results) {
      return Promise.resolve(response.results);
    }

    if (response.data) {
      return Promise.resolve(response.data);
    }

    return Promise.resolve(response);
  }
}

export function handleError(error: any) {
  if (error.response) {
    if (error.response.data.code === 402) return error.response.data;

    return Promise.reject(error.response);
  }

  return Promise.reject(error);
}
