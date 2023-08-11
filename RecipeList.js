import { Link } from 'react-router-dom'

// styles
import './RecipeList.css'



export default function RecipeList({ recipes }) {
 
  if (recipes.length === 0) {
    return <div className="error">No Apps to load...</div>
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className="card">
          <h3>{recipe.title}</h3>
          <h2 className = {recipe.App_Status === "Green" ? "stg" : "sta"}>{recipe.App_Status}</h2>
          <Link to={{pathname:'/recipes', state: recipe}} >View App</Link>
        </div>
      ))}
    </div>
  )
}
