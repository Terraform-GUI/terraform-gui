import ApiClient from './ApiClient';
import UserService, {
  UserApiClient,
} from './UserService';
import { useNavigate } from 'react-router-dom';

const accessToken = '';
const bla = new ApiClient(accessToken || '');

// bla.client.interceptors.response.use( 
//   response => {
//     return response
//   },
//   function (error) {
//     const originalRequest = error.config
//     if (
//       error.response.status === 401 &&
//     ) {
//       router.push('/login')
//       return Promise.reject(error)
//     }
// });


const userApiClient = new UserApiClient(bla);
export const userService = new UserService(userApiClient);
