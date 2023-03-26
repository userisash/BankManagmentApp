import React, { Children } from 'react';
import {createBrowserRouter, RouterProvider, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import './users.css';
import UsersList from './UsersList';
import { RootLayout } from './Root';

function App() {
const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        path:'/',
        element:<UsersList/>
      }
    ]
  }
])

  return (
    <div className='App'>
     <RouterProvider router={router}/>
    </div>
  );
}

export default App;
