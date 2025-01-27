import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from './App';
import { CharacterPage } from './pages/CharacterPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComponents } from './componentes/NavbarComponents';
import { FavoritesProvider } from './context/FavoritesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <NavbarComponents />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/people/:id" element={<CharacterPage />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
