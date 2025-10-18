import React from 'react'
import './App.css'
import CategoryFilterMenu from './components/categoryFiles/categorymenu'



function App() {
  return (
    <div className="App">
      <header className="app-header">
        <CategoryFilterMenu />
        
      </header>
      <main className="app-main">
        <h1>Shaheer's Week 1 Project</h1>
      </main>
    </div>
  )
}

export default App
