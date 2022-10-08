import React, {FunctionComponent, useState, useEffect} from "react";

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
    useEffect(() => {
        localStorage.setItem('is-access_token', accessToken);
    }, [accessToken]);
    useEffect(() => {
        localStorage.setItem('is-refresh_token', refreshToken);
    }, [refreshToken]);

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
    