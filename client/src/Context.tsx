import { createContext, useContext } from "react";
import { ICartProduct, IUser } from "./interfaces";

interface IContext {
    isLogin: boolean,
    token: string | null,
    setIsLogin: (isLogin: boolean) => void,
    setToken: (token: string | null) => void;
    getProducts: () => Promise<void>;
    getProfile: () => Promise<void>;
    cartItems: ICartProduct[];
    currentUser: IUser | null;
    sideCart: boolean;
    setSideCart: (sidecart: boolean) => void;
}

const Context = createContext<IContext>({
    isLogin: false,
    token: null,
    setIsLogin: () => console.log("error: setIsLogin is using default function"),
    setToken: () => console.log("error: setToken is using default function"),
    getProducts: async () => console.log("default function error"),
    getProfile: async () => console.log("default function error"),
    cartItems: [],
    currentUser: null,
    sideCart: false,
    setSideCart: () => console.log("default function error")
});

export const useAppContext = () => useContext(Context);
export default Context;






/**

interface IAuthContext {
    authenticated: boolean;
    login: (email: string, password: string) => Promise<Response>;
    logout: (token: string | null, refreshInterval?: NodeJS.Timeout | null) => Promise<Response | void>;
    refreshToken: () => Promise<string>
    user: IUser | null;
    token: string | null;
}

const AuthContext = createContext<IAuthContext>({
    authenticated: false,
    login,
    logout,
    refreshToken,
    token: null,
    user: null
});

*/
