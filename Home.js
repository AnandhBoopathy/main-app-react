import RecipeList from '../../components/RecipeList'
import Listvw from '../../components/Listvw'
import { useEffect, useState } from 'react';
import axios from 'axios';



// styles
import './Home.css'
import React from 'react'

const apiUrl = 'http://localhost:3003/healthcheck/'

export default function Home() {
  const [error, setError] = useState(false)
  // const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [data, setData] = useState([]);

  const healthCheckStatus = async () =>{
    setIsPending(true)
    try {
      const response = await axios.get(apiUrl);
      if(response.empty) {
          setError('No Apps to Load')
          setIsPending(false) 
      }else{
      setData(response.data);
      setIsPending(false)
      }
    } catch (error) {
      setIsPending(false)
      return 'Unable to perform health Check!'
    }
  }
  useEffect(() => {
    setInterval(healthCheckStatus, 30000);
    healthCheckStatus();
  }, []);
  // useEffect(() => {
  //   setIsPending(true)
  //   projectFirestore.collection('recipes').get().then((snapshot) => {
  //       if(snapshot.empty) {
  //         setError('No Apps to Load')
  //         setIsPending(false)
  //       } else {
  //         let results = []
  //         snapshot.docs.forEach(doc => {
  //           results.push({ id: doc.id, ...doc.data() })
  //         })
  //         setData(results)
  //         setIsPending(false)
  //       }
  //   }).catch(err => {
  //     setError(err.message)
  //     setIsPending(false)
  //   })
  // }, [])
  const [view, setView] = useState(true)
  const handleClick = () => {
    setView(!view);
  };
  var stat = "Green"
  const valu = (dat) => {
    for(let i =0;i<dat.length; i++){
        if (dat[i].App_Status === "Amber"){
          stat = "Amber"
          break
        }
    }
  }

  if (view) {
    return (
      <div className="home">
        {error && <p className="error">{error}</p>}
        {isPending && <p className="loading">Loading...</p>}
        {data &&
        <> 
          {valu(data)}
          <div>
            <button 
              className='button1'
              onClick={handleClick} >
              List View
            </button>
            <button 
              className={stat === "Green" ? "button2" : "button3"}>
               Overall:{stat}
            </button>
          </div>
          <RecipeList recipes={data} />
        </>}
      </div>
    )
  } else {
    return (
      <div className="home">
        {error && <p className="error">{error}</p>}
        {isPending && <p className="loading">Loading...</p>}
        {data && 
          <> 
            {valu(data)}
            <div>
              <button 
                className='button1'
                onClick={handleClick} >
                Grid View
              </button>
              <button 
                className={stat === "Green" ? "button2" : "button3"}>
                Overall:{stat}
              </button>
            </div>
          
            <Listvw recipes={data} />
          </>}
      </div>
    )
  }
}
