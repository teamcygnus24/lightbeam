import {Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { Context } from "../application.jsx";

/*
============================================================================================
PROTECTED ROUTES
-----------------
Dette verktøyet beskytter nettsiden og trigges hvis ikke brukeren er logget på.
Beskytter alle URLS som er wrapped med "Protected routes"
============================================================================================
*/ 

const ProtectedRoutes = () => {

    const [validation, setValidation] = useContext(Context)

    return validation ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoutes;