import { createContext, useState } from 'react';

export const FavoriteContext = createContext({
    favorites: [],
    addFavorite: () => {},
    deleteFavorite: () => {}
});

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            name: "Luke",
            type: "people",
        }
    ]);

    const addFavorite = (id, name, type) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.some(fav => fav.id === id)) {
                return [...prevFavorites, { id, name, type }];
            }
            return prevFavorites; // Avoid duplicates
        });
    };

    const deleteFavorite = (id) => {
        setFavorites((prevFavorites) => 
            prevFavorites.filter((favorite) => favorite.id !== id)
        );
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, deleteFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};
