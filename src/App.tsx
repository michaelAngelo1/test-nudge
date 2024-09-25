import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'
import supabase from './config/supabaseClient';
import SmoothieDetail from './pages/SmoothieDetail';
import { useState } from 'react';
import ModalWithText from './reusables/ModalWithText';

function App() {
  console.log(supabase);

  const [modalEnable, setModalEnable] = useState(true);
  const closeModal = () => {
    setModalEnable(false);
  }
  
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
      <ModalWithText 
        title='This is a research study. You may be asked several personal questions.' 
        text='It is in our best interest to protect your information. Anything inputted here would be used to support a research titled The Effects of Nudge on Decision-making by Professor Lundy'
        openModal={modalEnable}
        closeModal={closeModal}
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/smoothie-detail/:id' element={<SmoothieDetail/>}/>
        <Route path='/:id' element={<Update/>}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
