import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/FavoritesContext";

export const PlanetsPage = () => {
    const [planets, setPlanets] = useState([]);
    const navigate = useNavigate();
    const { addFavorite, favorites } = useContext(FavoriteContext);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/planets")
            .then((data) => data.json())
            .then((jsonData) => setPlanets(jsonData.results))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h1>Star Wars Planets</h1>
            {planets.map((planet) => (
                <Card key={planet.uid} className="mb-3 p-3">
                    <Card.Body>
                        <Card.Title>{planet.name}</Card.Title>
                        <Button
                            variant="primary"
                            onClick={() => navigate(`/planets/${planet.uid}`)}
                        >
                            Navigate
                        </Button>
                        <Button
                            onClick={() => {
                                if (!favorites.some(fav => fav.id === planet.uid)) {
                                    addFavorite(planet.uid, planet.name, "planets");
                                }
                            }}
                            variant="warning"
                            className="ms-2"
                        >
                            Fav
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};
