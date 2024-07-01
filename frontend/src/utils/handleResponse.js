 const handleResponse = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
};

export default handleResponse;
