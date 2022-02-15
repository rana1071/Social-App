
const makeAuthTokenHeader = token => {
    if (token) {
      return {
        headers: {
          'x-auth-token': token
        }
      }
    } else {
      throw new Error('Token is missing.');
    }
  }
   
  export default makeAuthTokenHeader;