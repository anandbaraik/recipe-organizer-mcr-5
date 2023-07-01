import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {BrowserRouter as Router} from "react-router-dom";
import { RecipeProvider } from "./context/RecipeContext";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </Router>
  </StrictMode>
);