import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './App.css'

function App() {
  const [listOfUsers, setListOfUsers]= useState([{}])
  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [cash, setCash] = useState(0)
  const [credits, setCredits] = useState(0)


  useEffect(()=>{
    Axios.get(`http://localhost:4001/user/getusers`).then((response)=>{
      setListOfUsers(response.data)
    })
  },[])

  const CreateUser = () => {
    const newUser = {
      name: name,
      username: username,
      cash: cash,
      credits: credits,
    };
  
    Axios.post(`http://localhost:4001/createuser`, newUser)
      .then((response) => {
        if (response.status === 200) {
          setListOfUsers([...listOfUsers, newUser]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <div className="App">
     <div className="userdisplay">
      {listOfUsers.map((user, index)=>{
        return(
          <div key={index}>
            <p>name:{user.name}</p>
            <p>username:{user.username}</p>
            <p>cash:{user.cash}</p>
            <p>credits:{user.credits}</p>
            </div>
        )
      })}
     </div>

          <div>
          <input type="text" placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
          <input type="text" placeholder='UserName'onChange={(e)=>{setUserName(e.target.value)}} />
          <input type="number" placeholder='Cash'onChange={(e)=>{setCash(e.target.value)}}/>
          <input type="number" placeholder='Credits'onChange={(e)=>{setCredits(e.target.value)}}/>
          <button onClick={CreateUser}>Add User</button>
         </div>
    </div>
  )
}

export default App
