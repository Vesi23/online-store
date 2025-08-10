import React from 'react';

export type Admin = {
    email: string;
}

export type AdminData = {
    email: string;
}

export interface AppContextType {
    admin: Admin | any;
    adminData: AdminData | any;
    setContext: (newContext: { admin: Admin | any, adminData: AdminData | any }) => void;
    isLoggedIn: boolean;
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};








