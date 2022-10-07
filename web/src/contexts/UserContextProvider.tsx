import React, {FunctionComponent, useState} from "react";

import UserContext from "./UserContext";

interface IUserContextProvider {
    children: React.ReactNode
}

const UserContextProvider: FunctionComponent<IUserContextProvider> = ({children}) => {
    const [email, setEmail] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('false');
    const [refreshToken, setRefreshToken] = useState<string>('false');

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
    