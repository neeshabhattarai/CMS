import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom';
import { routes } from './assets/Component/Route';

function App({children}) {
  return <RouterProvider router={routes}>
{children}
  </RouterProvider>
  
}

export default App
