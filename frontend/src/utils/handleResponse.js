 const handleResponse = (response) => {
    // if (response.status >= 200 && response.status < 300) {
    //   console.log(response);
    //   return response.data;
    // }
    // else {
    // console.log(response);
    //   throw new Error(response.statusText);
    // }
    return response.data;
};

export default handleResponse;
