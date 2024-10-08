import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'
import supabase from './config/supabaseClient';
import SmoothieDetail from './pages/SmoothieDetail';
import { useState } from 'react';
import ModalWithText from './reusables/ModalWithText';
import Questionnaire from './pages/Questionnaire';
import StartPage from './pages/StartPage';

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
          <a href='/' className='btn btn-ghost text-xl'>Nudge Form</a>
          <Link className='p-3 btn btn-ghost text-lg text-blue-500' to='/home'>Home</Link>
        </div>
        <div className="flex-none">
          <Link className='p-3 btn btn-ghost text-lg text-blue-500' to='/create'>Create</Link>
        </div>
      </div>
      <ModalWithText 
        title='This is a research study. You may be asked several personal questions.' 
        text='It is in our best interest to protect your information. Anything inputted here would be used to support a research titled The Effects of Nudge on Decision-making by Professor Idha'
        openModal={modalEnable}
        closeModal={closeModal}
      />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<StartPage/>}/>
        <Route path='/questionnaire' element={<Questionnaire/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/smoothie-detail/:id' element={<SmoothieDetail/>}/>
        <Route path='/:id' element={<Update/>}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
