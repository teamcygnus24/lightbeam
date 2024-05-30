import React from "react";
import ReactDOM from "react-dom/client";
import { Homepage } from "./components/pages/homepage";
import { Projects } from "./components/pages/projectpage";
import { Application } from "./components/application.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

//root.render(<Homepage/>);
root.render(
    <Application/>
);