import { useState } from 'react'
import './styles/App.css'
import axios from 'axios'

function App() {
  const [searchInput, setSearchInput] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }
  
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = "http://127.0.0.1:8000/news/topic=" + searchInput 
    axios.get(url).then((response) => {  
      console.log(response.data)
    })  
    e.preventDefault()
  }

  return (
    <>
      <h1 id='app-title'> Summarize News App </h1>
      <div className="search-container">
        <form id="search-form" action="search" method="GET">
          <input 
            id="search-bar"
            name="topic"
            type="text"
            placeholder="Search for news!"
            value={searchInput}
            onChange={handleChange}
          />
          <button id="search-button" type="submit" onClick={handleOnClick}> Search </button>
        </form>
      </div>
    </>
  )
}

export default App