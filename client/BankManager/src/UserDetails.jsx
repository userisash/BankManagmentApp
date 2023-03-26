import React, { useState } from 'react';
import { useParams } from 'react-router-dom'


function UserDetails({ user, onUpdate, onDelete }) {
    const { id } = useParams();
  const [updateEmail, setUpdateEmail] = useState(user.email);
  const [updatePassword, setUpdatePassword] = useState(user.password);

  const handleUpdate = () => {
    const updatedUser = {
      email: updateEmail,
      password: updatePassword,
    };
  
    fetch(`http://localhost:4001/user/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'credentials': 'include'
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => {
      onUpdate(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const handleDelete = () => {
    fetch(`http://localhost:4001/user/deleteuser/:${user._id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          onDelete(user._id);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => {
        console.error('There was a problem deleting the user:', error);
      });
  };
  
  return (
    <div>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>
      <input type="text" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
      <input type="text" value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default UserDetails;
