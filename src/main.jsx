import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
import "bootstrap/dist/css/botstrap.min.css";
import "@fortawesome/fontawesome-free/css-all.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(<AppRouter/>);