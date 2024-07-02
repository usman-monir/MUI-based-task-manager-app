const handleError = (error) => {
    if (error?.response) {
      // Server responded with a status other than 2xx
      throw new Error(error?.response?.data?.message || 'Server Error');
    } else if (error?.request) {
      // No response from the server
      throw new Error('Network Error');
    } else {
      // Something else caused the error
      throw new Error(error?.message);
    }
  };

export default handleError;
