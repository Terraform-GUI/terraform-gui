import {createContext, Dispatch, SetStateAction} from "react";

interface UserContextInterface {
    email: string|null,
    setEmail: Dispatch<SetStateAction<string>>,
    accessToken: string|null,
    setAccessToken: Dispatch<SetStateAction<string>>,
    refreshToken: string|null,
    setRefreshToken: Dispatch<SetStateAction<string>>
}

const UserContext = createContext<UserContextInterface>(undefined!);

export const UserProvider = UserContext.Provider;

export default UserContext;