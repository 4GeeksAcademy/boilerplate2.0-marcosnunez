import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FavoriteContext } from '../context/FavoritesContext';
import { isEmpty } from 'lodash';
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const NavbarComponents = () => {
  const { favorites, deleteFavorite } = useContext(FavoriteContext);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">SWAPI</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {!isEmpty(favorites) && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Favorites" id="collapsible-nav-dropdown">
                {favorites.map((favorite) => (
                  <NavDropdown.Item key={favorite.id} className="d-flex justify-content-between align-items-center">
                    <NavLink to={`/${favorite.type}/${favorite.id}`} className="me-2">
                      {favorite.name}
                    </NavLink>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => deleteFavorite(favorite.id)}
                    >
                      X
                    </Button>
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};
