import {Navigate, Outlet} from "react-router-dom";
import { Login } from "../pages/login";
import { useContext, useState } from "react";
import { Context } from "./router";

const ProtectedRoutes = () => {

    const [validation, setValidation] = useContext(Context)

    return validation ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;