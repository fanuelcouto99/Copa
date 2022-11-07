import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    singIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Criando contexto da aplicação para armazernar os dados do login feito através do Google
export const AuthContext = createContext({} as AuthContextDataProps);


// Criando função para fazer o login com o Google e compartilhar com a aplicação
export function AuthContextProvider({ children }: AuthProviderProps) {

    async function singIn() {
        console.log('Vamos logar!')
    }

    return (
        <AuthContext.Provider value={{
            singIn, user: {
                name: "Fanuel Couto",
                avatarUrl: "https://github.com/fanuelcouto99.png"
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};