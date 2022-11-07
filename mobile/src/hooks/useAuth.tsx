//  Criando hook para usar o contexto de autenticação de usaurio
import { useContext } from "react";
import { AuthContext, AuthContextDataProps } from '../contexts/AuthContexts';

export function useAuth(): AuthContextDataProps {
    const context = useContext(AuthContext);
    return context;
};