import React, { useContext, createContext, useMemo } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children, dispatch}) => {
    const authContext = useMemo(
        () => ({
          signIn: async token => {
            dispatch({ type: 'SIGN_IN', token: token });
          },
          signOut: () => dispatch({ type: 'SIGN_OUT', token: null }),
        }),
        []
      );

    return (
        <AuthContext.Provider
            value={authContext}
        >
             {children}
        </AuthContext.Provider>
    );
};
const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useSearchContext must be used within an Provider');
    }

    return context;
};

export { AuthContextProvider, useAuthContext };
