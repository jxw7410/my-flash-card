import axios from 'axios';

// Set Bearer token to axios's default header, as axios would be making request
// to the backend to pass the jwt auth paths.
export const setAuthToken = token => {
  if (token)
    axios.defaults.headers.common['Authorization'] = token;
  else 
    delete axios.defaults.headers.common['Authorization'];
}


export const registerUser = data => {
  axios.post('http://localhost:5000/api/users/register', data);
}

export const loginUser = data => {
  axios.post('http://localhost:5000/api/users/login', data);
}


