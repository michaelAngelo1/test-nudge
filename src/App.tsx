import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'
import supabase from './config/supabaseClient';

function App() {
  console.log(supabase);
  return (
    <BrowserRouter>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>SupaMike Smoothies</a>
          <Link className='btn btn-ghost text-xl text-blue-500' to='/'>Home</Link>
        </div>
        <div className="flex-none">
          
          <Link className='btn btn-ghost text-xl text-blue-500' to='/create'>Create New Smoothie</Link>
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/:id' element={<Update/>}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
