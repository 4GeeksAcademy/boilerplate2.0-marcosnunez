import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export const CharacterPage = () => {
    const [character, setCharacter] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/people/${id}`)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData);  
                if (jsonData.result && jsonData.result.properties) {
                    setCharacter(jsonData.result.properties);
                } else {
                    setError("Character data not found");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {!isEmpty(character) ? (
                <h2>{character.name}</h2>
            ) : (
                <p>No character data found.</p>
            )}
        </div>
    );
};
