// import { Auth } from "firebase/auth";
// import React, { createContext, ReactNode, useEffect, useState } from "react";

// interface AuthContextType{
//     isAdminLoggedIn: boolean;
//     login: (password:string) => boolean;
//     logout: () => void;
// }

// const AuthContext= createContext<AuthContextType | undefined>(undefined);

// export default AuthContext; 

// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [isAdminAoggedIn, setIsAdminLoggedIn]=useState<boolean>(false);
    
//   // Проверява localStorage при зареждане
//   useEffect(() => {
//     const savedAuth = localStorage.getItem('adminLoggedIn');
//     if (savedAuth === 'true') {
//       setIsAdminLoggedIn(true);
//     }
//   }, []);
// const login=(password:string):boolean=>{
//     if(password==="admin"){
//         setIsAdminLoggedIn(true);
//         localStorage.setItem('adminLoggedIn', 'true');
//         return true;
//     }
//     return false;
// }