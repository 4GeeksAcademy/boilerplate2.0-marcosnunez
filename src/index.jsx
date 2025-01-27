import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from './App';
import { CharacterPage } from './pages/CharacterPage';
import { PlanetPage } from './pages/PlanetPage';  // Ruta para la página de planetas
import { StarshipPage } from './pages/StarshipPage';  // Ruta para la página de naves espaciales

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
          <Route path="/planets/:id" element={<PlanetPage />} />  
          <Route path="/starships/:id" element={<StarshipPage />} />  
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
