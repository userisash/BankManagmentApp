import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import UserDetails from './UserDetails';
import Axios from 'axios';
import './users.css';

function UsersList(){
    const [listOfUsers, setListOfUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:4001/user/getusers")
      .then((response) => {
        setListOfUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createUser(user) {
    const newUser = {
      email: email,
      password: password,
    };
    fetch('http://localhost:4001/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
      .then(createdUser => {
        console.log(createdUser);
        setListOfUsers([...listOfUsers, {email, password}])
      })
      .catch(error => console.error(error));
  }
  
  const updateUser = (id) => {
    const updatedUser = {
      email: updateEmail,
      password: updatePassword,
    };
  
    fetch(`http://localhost:4001/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedUsers = [...listOfUsers];
        const index = updatedUsers.findIndex((user) => user._id === id);
        updatedUsers[index] = data;
        setListOfUsers(updatedUsers);
        setUpdateId('');
        setUpdateEmail('');
        setUpdatePassword('');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const deleteUser = (id) => {
    fetch(`http://localhost:4001/user/deleteuser/:${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(() => {
      const filteredUsers = listOfUsers.filter(u => u._id !== id);
      setListOfUsers(filteredUsers);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const handleDetailsClick = (user) => {
    // const Navigate = useNavigate();
    setSelectedUser(user);
    setShowDetails(false);
    // Navigate(`/UserDetails/${user._id}`);
    <Link to={`/user/${user._id}`}>Details</Link>
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };

  return (
    <div className="App">
      <ul className="userdisplay">
        {listOfUsers.map((user, index) => {
          return (
            <li key={index}>
              <div>
                <p>email:{user.email}</p>
                <p>password:{user.password}</p>
              </div>
              <div>
                <button onClick={() => {
                  setUpdateId(user._id);
                  setUpdateEmail(user.email);
                  setUpdatePassword(user.password);
                }}>Edit</button>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
                <button onClick={() => handleDetailsClick(user)}>Details</button>
              </div>
            </li>
          )
        })}
      </ul>
      <div>
        <input type="text" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
        <input type="text" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
        <button onClick={createUser}>Add User</button>
      </div>
      <div>
        <input type="text" placeholder='New Email' onChange={(e) => { setUpdateEmail(e.target.value) }} value={updateEmail} />
        <input type="text" placeholder='New Password' onChange={(e) => { setUpdatePassword(e.target.value) }} value={updatePassword} />
        <button onClick={() => updateUser(updateId)}>Update User</button>
      </div>
      {showDetails && <UserDetails user={selectedUser} onClose={handleDetailsClose} />}
    </div>
  );
  
}

export default UsersList