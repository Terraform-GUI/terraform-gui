import ApiClient from './ApiClient';
import UserService, {
  UserApiClient,
} from './UserService';
import { useNavigate } from 'react-router-dom';
import ResourceService, {ResourceApiClient} from "./ResourceService";

function buildServices() {
  const accessToken = localStorage.getItem('access_token');
  const apiClient = new ApiClient(accessToken || '');
  const loggedApiClient = new ApiClient(accessToken || '');
  loggedApiClient.client.interceptors.response.use( 
    response => {
      return response
    },
    function (error) {
      const navigate = useNavigate();
      if (error.response.status === 401) {
        navigate('/login')
        return Promise.reject(error)
      }
  });

  return {
    userService: new UserService(new UserApiClient(apiClient)),
    resourceService: new ResourceService(new ResourceApiClient(apiClient)),
    //add here other services ...Service: new ...Service(new ...ApiClient(apiClient/loggedApiClient)),
  };
}

export const {userService, resourceService} = buildServices();
