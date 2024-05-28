import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./router";

const ProtectedRoutes = () => {

    const [validation, setValidation] = useContext(Context)

    return validation ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;