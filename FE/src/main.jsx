import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StyledEngineProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { DataProvider } from "./context/DataContext.jsx";

createRoot(document.getElementById('root')).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <DataProvider>
        <App />
      </DataProvider>
    </BrowserRouter>
  </StyledEngineProvider>
);
