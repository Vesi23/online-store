import { useAppContext } from "../../context/appContext";
import { Navigate } from "react-router-dom";

const Authenticated = ({ children }: { children: React.ReactNode }) => {
    const { admin} = useAppContext();
    if (!admin || Object.keys(admin).length === 0) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default Authenticated;