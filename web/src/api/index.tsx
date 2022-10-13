import ApiClient from './ApiClient';
import UserService, {
  UserApiClient,
} from './UserService';
import axios from 'axios';
import ResourceService, {ResourceApiClient} from "./ResourceService";
import ProjectService, {ProjectApiClient} from "./ProjectService";

function buildServices() {

  const accessToken = localStorage.getItem('access_token');
  const loggedApiClient = new ApiClient(accessToken || '');

  loggedApiClient.client.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      let originalRequest = error.config

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorage.getItem('refresh_token')

        axios.post('http://localhost:8080/api/token/refresh', {
          refresh_token: refreshToken,
        }).then(function (response){
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem('access_token', response.data.token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            originalRequest.headers = {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              Authorization: `Bearer ${response.data.token}`,
            };
            return axios(originalRequest)
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
  });

  return {
    userService: new UserService(new UserApiClient(loggedApiClient)),
    resourceService: new ResourceService(new ResourceApiClient(loggedApiClient)),
    projectService: new ProjectService(new ProjectApiClient(loggedApiClient)),
    //add here other services ...Service: new ...Service(new ...ApiClient(apiClient/loggedApiClient)),
  };
}

export const {userService, resourceService, projectService} = buildServices();
