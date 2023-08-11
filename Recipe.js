import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { projectFirestore } from '../../firebase/config';
// styles
import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const [error, setError] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  
  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if(doc.exists){
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError('could not find the apps')
      }
    })

    return () => unsub()
  }, [id])

  const handleClick = (ind) => {
    projectFirestore.collection('recipes').doc(id).get().then((doc) => {
      var objects = doc.data().apps
      var objectToUpdate = objects[ind]
      objectToUpdate.Monitoring = !objectToUpdate.Monitoring
      objects[ind] = objectToUpdate 
      if (!objectToUpdate.Monitoring){
        objectToUpdate.status = "NA"
      } else {
        objectToUpdate.status = "UP"
      }
      projectFirestore.collection('recipes').doc(id).update({
        apps:objects
      })     
    })
    
  }

  return (
    <div className="apps">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
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
                  {recipe.apps.map((ing,index) => 
                    <tr>
                    <td>{ing.app}</td>
                    <td>{ing.status}</td>
                    <td>{ing.scode}</td>
                    <td>
                      {ing.Monitoring ? (
                        <label  onClick={function(){handleClick(index)}} className="switch">
                        <input  type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    ) : (
                      <label onClick={function(){handleClick(index)}} className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    )
                    }
                    </td>
                  </tr>)}
          </table>          
        </>
      )}
    </div>
  )
}