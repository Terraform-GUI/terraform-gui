import ApiClient from './ApiClient';
import UserService, {
  UserApiClient,
} from './UserService';

const accessToken = '';

const userApiClient = new UserApiClient(new ApiClient(accessToken || ''));
export const userService = new UserService(userApiClient);
