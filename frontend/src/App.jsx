import react from 'react'
import './App.css'
import UserInfoPage from './page/UserInfoPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Registration_login_Page from './page/Registration_login_Page'
import { useDispatch } from 'react-redux'
import Protected from './components/Protected'


function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element:  <Protected><UserInfoPage /></Protected> 
    },
    {
      path: "/registration",
      element:<Registration_login_Page />
    }

  ])
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
