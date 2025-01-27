import { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/FavoritesContext";

export const StarshipsPage = () => {
    const [starships, setStarships] = useState([]);
    const navigate = useNavigate();
    const { addFavorite, favorites } = useContext(FavoriteContext);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/starships")
            .then((data) => data.json())
            .then((jsonData) => setStarships(jsonData.results))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h1>Star Wars Starships</h1>
            {starships.map((starship) => (
                <Card key={starship.uid} className="mb-3 p-3">
                    <Card.Body>
                        <Card.Title>{starship.name}</Card.Title>
                        <Button
                            variant="primary"
                            onClick={() => navigate(`/starships/${starship.uid}`)}
                        >
                            Navigate
                        </Button>
                        <Button
                            onClick={() => {
                                if (!favorites.some(fav => fav.id === starship.uid)) {
                                    addFavorite(starship.uid, starship.name, "starships");
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
