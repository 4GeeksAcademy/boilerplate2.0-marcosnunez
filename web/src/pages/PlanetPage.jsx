import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

export const PlanetPage = () => {
    const [planet, setPlanet] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/planets/${id}`)
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData);
                if (jsonData.result && jsonData.result.properties) {
                    setPlanet(jsonData.result.properties);
                } else {
                    setError("Planet data not found");
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
            {!isEmpty(planet) ? (
                <h2>{planet.name}</h2>
            ) : (
                <p>No planet data found.</p>
            )}
        </div>
    );
};
