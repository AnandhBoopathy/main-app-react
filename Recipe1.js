import {  useLocation } from 'react-router-dom'

// styles
import './Recipe.css'
import { useEffect, useState } from 'react';

export default function Recipe() {
 const [recipe, setRecipe] = useState([])
 const location = useLocation();
 useEffect(() =>{
 setRecipe(location.state)},[location.state])
 console.log(recipe)
  return (
     
    <div className="apps">
        {recipe && (
        <> 
          <div>
            <h2 className="appname">{recipe.title}</h2>
            <p className={recipe.App_Status === "Green" ? "stg" : "sta"}>Status : {recipe.App_Status}</p>
          </div>
          <table>  
            <tr>
                  <th>Application Name</th>
                  <th>status</th>
                  <th>Status Code</th>
                  <th>Monitoring</th>
            </tr>          
                  {recipe.apps && recipe.apps.map((ing) => 
                    <tr>
                    <td>{ing.app}</td>
                    <td>{ing.status}</td>
                    <td>{ing.scode}</td>
                    <td>Enhancement awaited</td>
                  </tr>)}
          </table>          
        </>)}
    </div>
    
  )
}