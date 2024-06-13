import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../application.jsx";

const ProtectedRoutes = () => {

    const { validation } = useContext(AppContext)

    return validation ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;