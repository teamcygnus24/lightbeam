import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./view/home";
import { Projects } from "./view/project";
import { Application } from "./application.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<Home/>);
root.render(
    <Application/>
);