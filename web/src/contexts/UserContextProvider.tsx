import React, {FunctionComponent, useState} from "react";

import UserContext from "./UserContext";

interface IUserContextProvider {
    children: React.ReactNode
}

const UserContextProvider: FunctionComponent<IUserContextProvider> = ({children}) => {
    const [email, setEmail] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const [refreshToken, setRefreshToken] = useState<string>('');

    localStorage.getItem('access_token') && setAccessToken(localStorage.getItem('access_token')!);
    localStorage.getItem('refresh_token') && setRefreshToken(localStorage.getItem('refresh_token')!);

    return (
        <UserContext.Provider
            value={{
                email,
                setEmail,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
            }}
        >
          {children}
        </UserContext.Provider>
    );
};
    
export default UserContextProvider;
    