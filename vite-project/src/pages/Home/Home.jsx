import React, { useState, useEffect } from "react";
import "./Home.css";
import Tarjetas from "../Detalles/Tarjetas";

function Home() {
    const [showForm, setShowForm] = useState(false);
    const [searchLetter, setSearchLetter] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/dishes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setFilteredRecipes(data);
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    useEffect(() => {
        setFilteredRecipes(
            recipes.filter(recipe => 
                recipe.type.toLowerCase().includes(searchLetter.toLowerCase())
            )
        );
    }, [searchLetter, recipes]);

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        const newRecipe = {
            name: e.target.name.value,
            description: e.target.description.value,
            type: e.target.type.value,
            image: e.target.image.value,
            preparation: e.target.preparation.value,
        };
    
        try {
            const response = await fetch('http://localhost:3000/dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRecipe),
            });
    
            if (!response.ok) {
                throw new Error('Error adding recipe');
            }
    
            const data = await response.json();
            console.log('Recipe added successfully', data);
            setRecipes([...recipes, data]);
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    
        setShowForm(false);
    };

    const handleUpdateRecipe = (id, updatedRecipe) => {
        if (updatedRecipe) {
            setRecipes(recipes.map(recipe => recipe.id === id ? updatedRecipe : recipe));
        } else {
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        }
    };

    return (
        <>
            <div>
                <h1 id="Titulo">Recetas</h1>
                <button id="AgregarReceta" onClick={() => setShowForm(true)}>Agregar Receta</button>
                <input className="search"
                    type="text" 
                    placeholder="Buscar por receta" 
                    value={searchLetter} 
                    onChange={(e) => setSearchLetter(e.target.value)} 
                />
            </div>
            {showForm && (
                <div className="modal">
                    <form onSubmit={handleAddRecipe}>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" required />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input type="text" name="description" required />
                        </div>
                        <div>
                            <label>Type:</label>
                            <input type="text" name="type" required />
                        </div>
                        <div>
                            <label>Image:</label>
                            <input type="text" name="image" required />
                        </div>
                        <div>
                            <label>Preparation:</label>
                            <textarea name="preparation" required></textarea>
                        </div>
                        <button type="submit">Add Recipe</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
            <div id="OrdenarTarjetas" >
                {filteredRecipes.map((recipe, index) => (
                    <Tarjetas
                        key={index}
                        id={recipe.id}
                        Nombre={recipe.name}
                        onUpdate={(id, updatedRecipe) => {
                            handleUpdateRecipe(id, updatedRecipe);
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;