export default function IngredientList(props) {
  const items = (props.ingredients || []).map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredient-list">{items}</ul>
      {props.ingredients && props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe</h3>
            <p>Generate a recipe based on your ingredients</p>
          </div>
          <div>
            <button onClick={props.getRecipe}>Get Recipe</button>
          </div>
        </div>
      )}
    </section>
  )
}