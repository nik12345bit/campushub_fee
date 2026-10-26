import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CampusProvider } from "./context/CampusContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./style.css";
import "./react-overrides.css";
import "./react-features.css";

createRoot(document.getElementById("root")).render(<React.StrictMode><Provider store={store}><CampusProvider><App /></CampusProvider></Provider></React.StrictMode>);
