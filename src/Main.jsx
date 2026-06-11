import React, { useState } from "react"
import IngredientList from "./components/IngredientList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromGemini } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromGemini(ingredients);
        setRecipe(recipeMarkdown);
    }

    function addIngredient(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredients");
        if (newIngredient.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
            e.target.reset();
        }
    }

    function clearIngredients() {
        setIngredients([]);
        setRecipe("");
    }

    return (
        <main>
            <form className="add-ingredient-form" onSubmit={addIngredient}>
                <input type="text" placeholder="Ingredient name" name="ingredients" />
                <button type="submit">Add Ingredient</button>
            </form>
            {ingredients.length > 0 && (
                <button onClick={clearIngredients} className="clear-btn">Clear All</button>
            )}
             {ingredients.length > 0 &&
                <IngredientList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }
            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
