import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ZegoCloud from './components/ZegoCloud'
import Video_Room from './components/Video_Room'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ZegoCloud />} />
        <Route path="/room/:id" element={<Video_Room />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App