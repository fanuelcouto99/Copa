import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    singIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Criando contexto da aplicação para armazernar os dados do login feito através do Google
export const AuthContext = createContext({} as AuthContextDataProps);


// Criando função para fazer o login com o Google e compartilhar com a aplicação
export function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '409198835429-hh60o5hmuod2i1lf8vn0cgv5jqm7hm9e.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    });

    async function singIn() {
        try {
            setIsUserLoading(true);
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserLoading(false);
        }
    };

    async function singInWithGoogle(access_token: string) {
        console.log('TOKEN DE AUTENTICAÇÃO ===> ', access_token);
    };

    // Use effect para ficar monitorando se o usuario foi autenticado
    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            singInWithGoogle(response.authentication.accessToken);
        };
    }, [response]);

    return (
        <AuthContext.Provider value={{
            singIn,
            isUserLoading,
            user
        }}>
            {children}
        </AuthContext.Provider>
    );
};