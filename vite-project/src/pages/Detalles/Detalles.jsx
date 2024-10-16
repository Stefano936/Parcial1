import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/dishes/${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data))
        .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1>{recipe.name}</h1>
        <p>Descripcion: {recipe.description}</p>
        <p>Tipo: {recipe.type}</p>
        <p>{recipe.image}</p>
        <p>Preparacion: {recipe.preparation}</p>
    </div>
    );
}

export default RecipeDetails;