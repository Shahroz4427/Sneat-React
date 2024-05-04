import { useState } from 'react'
import AppLayout from './layouts/AppLayout'
import UserForm from './pages/UserForm'
import Home from './pages/Home'
import MultiForm from './pages/MultiForm'
import Crud from './pages/Crud'
import Shopping from './pages/Shopping'

function App() {
  const [count, setCount] = useState(0)

  return (
 
   <AppLayout>
       {/* <UserForm></UserForm> */}
       {/* <Home></Home> */}
       {/* <MultiForm></MultiForm> */}
       <Crud></Crud>
       {/* <Shopping></Shopping> */}
   </AppLayout>
      
  )
}

export default App
