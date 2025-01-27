import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export const StarshipPage = () => {
    const [starship, setStarship] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/starships/${id}`)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData);
                if (jsonData.result && jsonData.result.properties) {
                    setStarship(jsonData.result.properties);
                } else {
                    setError("Starship data not found");
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
            {!isEmpty(starship) ? (
                <h2>{starship.name}</h2>
            ) : (
                <p>No starship data found.</p>
            )}
        </div>
    );
};
