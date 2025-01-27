import { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../context/FavoritesContext";

export const PeoplePage = () => {
    const [people, setPeople] = useState([]);
    const navigate = useNavigate();
    const { addFavorite, favorites } = useContext(FavoriteContext);

    useEffect(() => {
        fetch("https://www.swapi.tech/api/people")
            .then((data) => data.json())
            .then((jsonData) => setPeople(jsonData.results))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container">
            <h1>Star Wars Characters</h1>
            {people.map((character) => (
                <Card key={character.uid} className="mb-3 p-3">
                    <Card.Body>
                        <Card.Title>{character.name}</Card.Title>
                        <Button 
                            variant="primary" 
                            onClick={() => navigate(`/people/${character.uid}`)}
                        >
                            Navigate
                        </Button>
                        <Button 
                            onClick={() => {
                                if (!favorites.some(fav => fav.id === character.uid)) {
                                    addFavorite(character.uid, character.name, "people");
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
