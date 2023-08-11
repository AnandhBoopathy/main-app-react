import { Link } from 'react-router-dom'


// styles
import './Listvw.css'

export default function Listvw({ recipes }) {

  if (recipes.length === 0) {
    return <div className="error">No Apps to load...</div>
  }

  return (
    <div>
        <table>
            <tr>
                <th>Application Name</th>
                <th>status</th>
                <th>Check</th>
            </tr>
        {recipes.map(recipe => (
            <tr key={recipe.id} className="card">
                <td>{recipe.title}</td>
                <td>{recipe.App_Status}</td>
                <td><Link to={{pathname:'/recipes', state: recipe}}>View App</Link></td>
            </tr>
         
  ))}
      </table>
    </div>
  )
}

