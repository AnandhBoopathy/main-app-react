import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'

// styles
import './Create.css'

export default function Create() {  
  const [title, setTitle] = useState('')
  const [App_Status, setApp_Status] = useState('')

  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, App_Status })
  }

  
  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      history.push('/')
    }
  }, [data, history])

  return (
    <div className="create">
      <h2 className="page-title">Add a Application name to monitor</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>App Name:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
           <span>Current Status:</span>
           <select 
            className='box'
            type="text" 
            onChange={(e) => setApp_Status(e.target.value)}
            value={App_Status}
            required
          >
            <option value='' selected disabled hidden>Select an option</option>
            <option>NA</option>
            <option>UP</option>
            <option>DOWN</option>
          </select>
        </label>
        <button className="btn">Add</button>
      </form>
    </div>
  )
}
